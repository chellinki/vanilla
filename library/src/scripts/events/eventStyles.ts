/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { styleFactory, useThemeCache, variableFactory } from "@library/styles/styleUtils";
import { IThemeVariables } from "@library/theming/themeReducer";
import { defaultFontFamily, globalVariables } from "@library/styles/globalStyleVars";
import { borders, singleBorder } from "@library/styles/styleHelpersBorders";
import { paddings } from "@library/styles/styleHelpersSpacing";
import { colorOut, fonts, negativeUnit, unit } from "@library/styles/styleHelpers";
import { calc, percent } from "csx";
import { dateTimeVariables } from "@library/content/dateTimeStyles";
import { lineHeightAdjustment } from "@library/styles/textUtils";
import { metaContainerStyles, metaItemStyle } from "@library/styles/metasStyles";
import { selectBoxClasses } from "@library/forms/select/selectBoxStyles";
import { clickableItemStates } from "@dashboard/compatibilityStyles/clickableItemHelpers";

export const eventsVariables = useThemeCache((forcedVars?: IThemeVariables) => {
    const makeVars = variableFactory("dateTime", forcedVars);
    const globalVars = globalVariables();

    const compact = makeVars("compact", {
        gutter: globalVars.gutter.size,
    });

    // Clone link state colors.
    const title = makeVars("title", {
        font: {
            lineHeight: globalVars.lineHeights.condensed,
            size: globalVars.fonts.size.large,
            weight: globalVars.fonts.weights.semiBold,
        },
    });

    const spacing = makeVars("spacing", {
        contentSpacer: globalVars.gutter.half,
        attendanceOffset: 5,
        padding: {
            vertical: 20,
            horizontal: 5,
        },
    });

    return { compact, title, spacing };
});

export const eventsClasses = useThemeCache(() => {
    const style = styleFactory("events");
    const vars = eventsVariables();
    const globalVars = globalVariables();

    const root = style("root", {
        display: "block",
    });

    const empty = style("empty", {
        display: "block",
    });

    const list = style("list", {
        display: "block",
        marginLeft: negativeUnit(vars.spacing.padding.horizontal * 2),
        width: calc(`100% + ${vars.spacing.padding.horizontal * 4}`),
    });

    const item = style("item", {
        display: "block",
        borderBottom: singleBorder(),
        ...paddings({
            horizontal: vars.spacing.padding.horizontal,
        }),
        $nest: {
            [`&.isFirst`]: {
                borderTop: singleBorder(),
            },
        },
    });

    const title = style("title", {
        ...lineHeightAdjustment(),
        display: "block",
        ...fonts(vars.title.font),
    });

    const linkColors = clickableItemStates()["$nest"];
    const toggleClass = selectBoxClasses().toggle;

    const link = style("link", {
        color: colorOut(globalVars.mainColors.fg),
        display: "flex",
        flexWrap: "nowrap",
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        ...paddings(vars.spacing.padding),
        $nest: {
            [`& .${toggleClass}`]: {
                marginLeft: "auto",
                fontWeight: globalVars.fonts.weights.normal,
            },
            [`&:hover .${title}`]: {
                ...linkColors!["&&:hover"],
            },
            [`&:focus .${title}`]: {
                ...linkColors!["&&:focus"],
            },
            [`&.focus-visible .${title}`]: {
                ...linkColors!["&&:focus-visible"],
            },
            [`&:active .${title}`]: {
                ...linkColors!["&&:active"],
            },
            [`&:visited .${title}`]: {
                ...linkColors!["&&:visited"],
            },
        },
    });

    const result = style("result", {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: percent(100),
    });

    const compactDateSize = unit(dateTimeVariables().compact.container.size);

    const dateCompact = style("dateCompact", {
        flexBasis: unit(compactDateSize),
        flexShrink: 1,
    });

    const body = style("body", {
        display: "block",
    });

    const main = style("main", {
        display: "block",
        paddingLeft: unit(vars.compact.gutter),
    });

    const excerpt = style("excerpt", {
        display: "block",
        marginTop: unit(vars.spacing.contentSpacer),
    });

    const metas = style("metas", {
        ...metaContainerStyles(),
        marginTop: unit(vars.spacing.contentSpacer),
    });

    const meta = style("meta", {
        ...metaItemStyle(),
    });

    const attendance = style("attendance", {
        display: "block",
        ...lineHeightAdjustment(),
        ...paddings({
            vertical: vars.spacing.padding.vertical,
        }),
    });

    const dropDown = style("dropDown", {
        $nest: {
            [`& .${selectBoxClasses().toggle}`]: {
                marginLeft: "auto",
                fontWeight: globalVars.fonts.weights.normal,
            },
        },
    });

    return {
        root,
        item,
        list,
        body,
        result,
        link,
        title,
        main,
        excerpt,
        metas,
        meta,
        empty,
        attendance,
        dateCompact,
        dropDown,
    };
});