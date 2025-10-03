import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCitySearch } from '@/hooks/useCitySearch'

type Props = {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export function CitySearch({ value, onValueChange, placeholder = 'Выберите город...' }: Props) {
  const [open, setOpen] = useState(false)
  const { data: cities = [], isLoading } = useCitySearch(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Поиск города..." value={value} onValueChange={onValueChange} />
          <CommandList>
            <CommandEmpty>{isLoading ? 'Поиск...' : 'Город не найден'}</CommandEmpty>
            <CommandGroup>
              {cities.map(city => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={currentValue => {
                    onValueChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${value === city.value ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
