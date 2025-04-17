'use client'

import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { useMemo, useState } from 'react'

interface TagCloudProps {
  tagCounts: Record<string, number>
}

// Các màu sắc chủ đạo cho các nhóm tag
const TAG_COLORS = [
  'bg-blue-50 text-blue-700 hover:bg-blue-600 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-700',
  'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-700',
  'bg-amber-50 text-amber-700 hover:bg-amber-600 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-700',
  'bg-rose-50 text-rose-700 hover:bg-rose-600 dark:bg-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-700',
  'bg-purple-50 text-purple-700 hover:bg-purple-600 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-700',
  'bg-orange-50 text-orange-700 hover:bg-orange-600 dark:bg-orange-900/40 dark:text-orange-300 dark:hover:bg-orange-700',
]

export default function TagCloud({ tagCounts }: TagCloudProps) {
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  
  // State để theo dõi tag đang được hover
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  
  // Calculate tag sizes based on count and assign colors
  const { minCount, maxCount, tagStyles } = useMemo(() => {
    const min = sortedTags.length > 0 ? 
      Math.min(...sortedTags.map(tag => tagCounts[tag])) : 0;
    const max = sortedTags.length > 0 ? 
      Math.max(...sortedTags.map(tag => tagCounts[tag])) : 0;
      
    // Create a map of tag styles
    const styles = {} as Record<string, {
      fontSize: string;
      padding: string;
      opacity: number;
      scale: number;
      colorClass: string;
      x: number;
      y: number;
      rotateZ: number;
    }>;
    
    // Pre-assign colors to most common tags for consistency
    const topTags = [...sortedTags].slice(0, TAG_COLORS.length);
    const colorMap = new Map();
    topTags.forEach((tag, idx) => {
      colorMap.set(tag, TAG_COLORS[idx % TAG_COLORS.length]);
    });
    
    sortedTags.forEach(tag => {
      const count = tagCounts[tag];
      const range = max - min || 1;
      const ratio = (count - min) / range;
      
      // Scale from 0.9rem to 1.8rem for font size
      const fontSize = 0.9 + (ratio * 0.9);
      
      // Scale padding based on font size
      const paddingV = 0.3 + (ratio * 0.3);
      const paddingH = 0.7 + (ratio * 0.5);
      
      // Use assigned color or get a "random" consistent color based on tag name
      const colorClass = colorMap.get(tag) || 
        TAG_COLORS[tag.length % TAG_COLORS.length];
        
      // Thêm vị trí ngẫu nhiên cho hiệu ứng galaxy
      const x = Math.sin(tag.length * 0.5) * 20;
      const y = Math.cos(tag.charCodeAt(0) * 0.1) * 20;
      const rotateZ = (tag.length % 5) * 10 - 20;
      
      styles[tag] = {
        fontSize: `${fontSize}rem`,
        padding: `${paddingV}rem ${paddingH}rem`,
        opacity: 0.7 + (ratio * 0.3),
        scale: 1 + (ratio * 0.15),
        colorClass,
        x,
        y,
        rotateZ
      };
    });
    
    return { minCount: min, maxCount: max, tagStyles: styles };
  }, [sortedTags, tagCounts]);
  
  // Hàm tính toán vị trí của tag khi cloud effect được kích hoạt
  const getGalaxyPosition = (tag: string, isHovered: boolean) => {
    const style = tagStyles[tag];
    const baseTransform = `scale(${style.scale})`;
    
    // Nếu đang hover vào tag cloud
    if (hoveredTag !== null) {
      // Tag được hover sẽ hiển thị ở trung tâm
      if (tag === hoveredTag) {
        return {
          transform: `${baseTransform} scale(1.2)`,
          zIndex: 20,
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
        };
      }
      
      // Các tag còn lại di chuyển ra xa theo hiệu ứng
      return {
        transform: `${baseTransform} translate(${style.x}px, ${style.y}px) rotateZ(${style.rotateZ}deg)`,
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 10
      };
    }
    
    // Trạng thái ban đầu
    return {
      transform: baseTransform,
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    };
  };
  
  return (
    <div 
      className="relative flex flex-wrap gap-4 pt-6 md:pt-0 max-w-4xl justify-center mx-auto min-h-[300px] perspective-[800px]"
      onMouseLeave={() => setHoveredTag(null)}
    >
      {tagKeys.length === 0 && <p className="font-lexend">No tags found.</p>}
      {sortedTags.map((t) => {
        const style = tagStyles[t];
        const isHovered = t === hoveredTag;
        
        return (
          <div 
            key={t} 
            className={`transition-all duration-500 ${isHovered ? '' : 'hover:z-10'}`}
            style={getGalaxyPosition(t, isHovered)}
            onMouseEnter={() => setHoveredTag(t)}
          >
            <Link
              href={`/tags/${slug(t)}`}
              className={`font-prompt inline-block rounded-full transition-all duration-300 hover:text-white shadow-sm hover:shadow-md ${style.colorClass} ${isHovered ? 'shadow-lg ring-2 ring-white/30 dark:ring-gray-500/30' : ''}`}
              style={{ 
                fontSize: style.fontSize,
                padding: style.padding,
                opacity: isHovered ? 1 : style.opacity,
                backdropFilter: isHovered ? 'blur(4px)' : 'none'
              }}
              aria-label={`View posts tagged ${t}`}
            >
              {t}
              <span className="ml-1 font-normal opacity-70">{tagCounts[t]}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
} 