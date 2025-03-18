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
    <div className="flex items-center gap-2 p-2 rounded-md shadow-sm border-fz-input">
      {link && (
        <a
          href={link}
          rel="noopener noreferrer"
          target="_blank"
          className="text-sm underline break-all"
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
          className="data-[orientation=vertical]:h-4"
        />
      )}

      <div className="flex items-center flex-nowrap">
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
