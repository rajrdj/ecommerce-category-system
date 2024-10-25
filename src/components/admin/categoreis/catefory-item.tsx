// src/components/admin/categories/category-item.tsx
import { Category } from '@/types/category';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, Edit2, Trash2 } from 'lucide-react';

interface CategoryItemProps {
  category: Category;
  level: number;
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CategoryItem({
  category,
  level,
  onToggle,
  onEdit,
  onDelete,
}: CategoryItemProps) {
  return (
    <div>
      <div 
        className="flex items-center p-2 hover:bg-gray-50"
        style={{ paddingLeft: `${level * 20}px` }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 mr-2"
          onClick={() => onToggle(category._id)}
          disabled={!category.children?.length}
        >
          {category.children?.length ? (
            category.isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : null}
        </Button>
        
        <span className="flex-1">{category.name}</span>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(category._id)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(category._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {category.isExpanded && category.children?.map((child) => (
        <CategoryItem
          key={child._id}
          category={child}
          level={level + 1}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}