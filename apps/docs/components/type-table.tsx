import { InfoIcon, LinkIcon } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { toKebabCase, normalizedString } from "@/lib/utils";

interface Field {
  title: string;
  description?: string;
  items: {
    prop: string;
    type: string | string[];
    description?: string;
    defaultValue?: string;
    required?: boolean;
    params?: string;
    asLink?: boolean;
  }[];
}

interface Props {
  fields: Field[];
}

export const TypeTable = ({ fields }: Props) => {
  return fields.map((field, fieldIdx) => (
    <div key={fieldIdx}>
      <h3
        className="flex flex-row items-center gap-2"
        id={normalizedString(field.title)}
      >
        <Link
          data-card
          href={`#${normalizedString(field.title)}`}
          className="peer"
        >
          {field.title}
        </Link>
        <LinkIcon
          className="size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100"
          aria-label="Link to section"
        />
      </h3>
      {field.description && <p>{field.description}</p>}

      <Table className="!my-0">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Prop</TableHead>
            <TableHead className="w-1/6">Type</TableHead>
            <TableHead className="w-1/6">Default</TableHead>
            <TableHead className="w-1/6">Required</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {field.items.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="flex items-center gap-1">
                <Badge
                  className="rounded-sm bg-fd-primary/15 text-fd-primary"
                  asChild
                >
                  <code>{item.prop}</code>
                </Badge>

                {item.description && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-1 size-6"
                      >
                        <InfoIcon aria-hidden className="size-3.5" />
                        <span className="sr-only">More info</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2.5">
                      <p className="text-sm">{item.description}</p>
                    </PopoverContent>
                  </Popover>
                )}
              </TableCell>

              <TableCell>
                {item.asLink ? (
                  <Link
                    href={`#${toKebabCase(item.prop)}`}
                    className="flex items-center gap-1"
                  >
                    {item.type ? (
                      <Badge variant="secondary" className="rounded-sm" asChild>
                        <code>
                          {Array.isArray(item.type)
                            ? item.type.map((val) => `"${val}"`).join(" | ")
                            : item.type}
                        </code>
                      </Badge>
                    ) : (
                      <>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          className="text-fd-muted-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">No</span>
                      </>
                    )}
                    {item.params && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="p-1 size-6"
                          >
                            <InfoIcon aria-hidden className="size-3.5" />
                            <span className="sr-only">Parameters</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2.5">
                          <code className="text-xs">{item.params}</code>
                        </PopoverContent>
                      </Popover>
                    )}
                  </Link>
                ) : (
                  <div className="flex items-center gap-1">
                    {item.type ? (
                      <Badge variant="secondary" className="rounded-sm" asChild>
                        <code>
                          {Array.isArray(item.type)
                            ? item.type.map((val) => `"${val}"`).join(" | ")
                            : item.type}
                        </code>
                      </Badge>
                    ) : (
                      <>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          className="text-fd-muted-foreground"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">No</span>
                      </>
                    )}
                    {item.params && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="p-1 size-6"
                          >
                            <InfoIcon aria-hidden className="size-3.5" />
                            <span className="sr-only">Parameters</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2.5">
                          <code className="text-xs">{item.params}</code>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                )}
              </TableCell>

              <TableCell>
                {item.defaultValue ? (
                  <Badge variant="secondary" className="rounded-sm" asChild>
                    <code>{item.defaultValue}</code>
                  </Badge>
                ) : (
                  <>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      className="text-fd-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">No default value</span>
                  </>
                )}
              </TableCell>
              <TableCell>
                {item.required ? (
                  <Badge variant="secondary" className="rounded-sm" asChild>
                    <code>{item.required ? "true" : "false"}</code>
                  </Badge>
                ) : (
                  <>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      className="text-fd-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">No default value</span>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ));
};
