import { cn } from '@/lib/utils';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Trace } from '@/lib/traces/types';
import { Switch } from './switch';

interface column {
  id: string;
  name: string;
}
interface ColumnVisibilityProps<TData> {
  columns: ColumnDef<TData>[];
  visibleColumns?: column[];
  handleToggle?: () => void;
  className?: string;
}
export default function ColumnVisibility<TData>({
  columns,
  visibleColumns,
  handleToggle,
  className
}: ColumnVisibilityProps<TData>) {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [columnsVisibility, setColumnsVisibility] = useState<
    Record<string, boolean>
  >({});
  const hasFilters = true;
  console.log(columns);

  // const hiddenColumns = columns.map(() => {});

  const handleChecked = (columnId: string) => {};
  // useEffect(() => {
  //   localStorage.setItem('Hidden Columns', JSON.stringify());
  // }, [columnsVisibility]);
  return (
    <Popover
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
      //   key={useSearchParams().toString()}
    >
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          className={cn(
            'text-secondary-foreground h-8',
            hasFilters
              ? 'text-primary bg-primary/20 border-primary/40 hover:bg-primary/30'
              : ''
          )}
        >
          Hide Column
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-30 p-0 w-[300px]" side="bottom" align="end">
        <div className="">
          <div className="pl-2 pr-2">
            {columns.length > 0 && (
              <table key={columns.length.toString()} className="w-full">
                <tbody>
                  {columns.map(
                    (column) =>
                      typeof column.header === 'string' && (
                        <div
                          key={column.id}
                          className="flex flex-row justify-between p-2 border-t"
                        >
                          {column.header}
                          <div>
                            <Switch
                              checked={
                                column.id
                                  ? columnsVisibility[column.id] || false
                                  : false
                              }
                              onCheckedChange={() => column.id && handleChecked(column.id)}
                            />
                          </div>
                        </div>
                      )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
