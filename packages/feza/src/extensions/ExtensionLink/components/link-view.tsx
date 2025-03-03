import { PenIcon, UnlinkIcon } from "lucide-react";

import { ActionButton, Separator } from "@/components";
import { truncateString } from "@/utils/utils";

interface LinkViewerProps {
  link: string;
  handleUnlink: () => void;
  handleEdit: () => void;
}

export const LinkViewer = ({
  link,
  handleUnlink,
  handleEdit,
}: LinkViewerProps) => {
  return (
    <div className="feza:flex feza:items-center feza:gap-2 feza:p-2 feza:rounded-md feza:shadow-sm feza:border-input">
      {link && (
        <a
          href={link}
          rel="noopener noreferrer"
          target="_blank"
          className="feza:text-sm feza:underline feza:break-all"
        >
          {truncateString({
            str: link,
            length: 40,
          })}
        </a>
      )}

      {link && (
        <Separator
          orientation="vertical"
          className="feza:data-[orientation=vertical]:h-4"
        />
      )}

      <div className="feza:flex feza:items-center feza:flex-nowrap">
        <ActionButton
          icon={PenIcon}
          tooltip="Edit"
          action={handleEdit}
          tooltipOptions={{ sideOffset: 8 }}
        />

        <ActionButton
          icon={UnlinkIcon}
          tooltip="Unlink"
          action={handleUnlink}
          tooltipOptions={{ sideOffset: 8 }}
        />
      </div>
    </div>
  );
};
