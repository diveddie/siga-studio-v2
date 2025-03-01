"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTranslations } from "@/components/translations-context";

export function ToolsEducation() {
  const { t } = useTranslations();

  const AVAILABLE_TOOLS = [
    {
      name: t("tools.availableTools.copyFn.name"),
      description: t("tools.availableTools.copyFn.description"),
    },
    {
      name: t("tools.availableTools.getTime.name"),
      description: t("tools.availableTools.getTime.description"),
    },
    {
      name: t("tools.availableTools.themeSwitcher.name"),
      description: t("tools.availableTools.themeSwitcher.description"),
    },
    {
      name: t("tools.availableTools.partyMode.name"),
      description: t("tools.availableTools.partyMode.description"),
    },
    {
      name: t("tools.availableTools.launchWebsite.name"),
      description: t("tools.availableTools.launchWebsite.description"),
    },
    {
      name: t("tools.availableTools.scrapeWebsite.name"),
      description: t("tools.availableTools.scrapeWebsite.description"),
    },
    {
      name: t("tools.availableTools.generateImage.name"),
      description: t("tools.availableTools.generateImage.description"),
    },
    {
      name: t("tools.availableTools.createImageMask.name"),
      description: t("tools.availableTools.createImageMask.description"),
    },
    {
      name: t("tools.availableTools.inpaintImage.name"),
      description: t("tools.availableTools.inpaintImage.description"),
    },
    {
      name: t("tools.availableTools.restartSession.name"),
      description: t("tools.availableTools.restartSession.description"),
    },
    {
      name: t("tools.availableTools.clearMask.name"),
      description: t("tools.availableTools.clearMask.description"),
    },
    {
      name: t("tools.availableTools.showHelp.name"),
      description: t("tools.availableTools.showHelp.description"),
    },
    {
      name: t("tools.availableTools.closeHelp.name"),
      description: t("tools.availableTools.closeHelp.description"),
    },
    {
      name: t("tools.availableTools.changeVoice.name"),
      description: t("tools.availableTools.changeVoice.description"),
    },
    {
      name: t("tools.availableTools.explainSiga.name"),
      description: t("tools.availableTools.explainSiga.description"),
    }
  ] as const;

  return (
    <div className="w-full max-w-lg mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="tools">
          <AccordionTrigger>{t("tools.availableTools.title")}</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {AVAILABLE_TOOLS.map((tool) => (
                  <TableRow key={tool.name}>
                    <TableCell className="font-medium">{tool.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tool.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
