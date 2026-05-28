import { Badge } from '@/components/ui/badge';
import type { ScanCategory } from '@/lib/schemas';

const labels: Record<ScanCategory, string> = {
  high_complexity: 'High complexity',
  repetitive_pattern: 'Repetitive',
  test_gap: 'Test gap',
  refactor_opportunity: 'Refactor',
  doc_gap: 'Doc gap',
};

const variants: Record<ScanCategory, string> = {
  high_complexity: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30',
  repetitive_pattern: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
  test_gap: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
  refactor_opportunity:
    'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30',
  doc_gap: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30',
};

export function CategoryBadge({ category }: { category: ScanCategory }) {
  return (
    <Badge variant="outline" className={variants[category]}>
      {labels[category]}
    </Badge>
  );
}
