/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext, useEffect, useState } from "react"
import { ColorModeContext, EventLoopContext } from "/utils/context"
import { Event, getBackendURL, isTrue, refs } from "/utils/state"
import { MoonIcon as LucideMoonIcon, SunIcon as LucideSunIcon, WifiOffIcon as LucideWifiOffIcon } from "lucide-react"
import { keyframes } from "@emotion/react"
import { toast, Toaster } from "sonner"
import env from "/env.json"
import { Box as RadixThemesBox, Card as RadixThemesCard, Container as RadixThemesContainer, Flex as RadixThemesFlex, Grid as RadixThemesGrid, Heading as RadixThemesHeading, IconButton as RadixThemesIconButton } from "@radix-ui/themes"
import { Grid as DataTableGrid } from "gridjs-react"
import "gridjs/dist/theme/mermaid.css"
import NextHead from "next/head"



export function Div_24a2e81d0c5d3cb5b5f786fdef44e514 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    <div css={({ ["position"] : "fixed", ["width"] : "100vw", ["height"] : "0" })} title={("Connection Error: "+((connectErrors.length > 0) ? connectErrors[connectErrors.length - 1].message : ''))}>
  <Fragment_e521b13e556da291bcec5187a783ea81/>
</div>
  )
}

const pulse = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`


export function Fragment_eb4ad804ee463e78d3c73fc2a2903123 () {
  const { resolvedColorMode } = useContext(ColorModeContext)



  return (
    <Fragment>
  {isTrue((resolvedColorMode === "light")) ? (
  <Fragment>
  <LucideSunIcon css={({ ["color"] : "var(--current-color)" })}/>
</Fragment>
) : (
  <Fragment>
  <LucideMoonIcon css={({ ["color"] : "var(--current-color)" })}/>
</Fragment>
)}
</Fragment>
  )
}

export function Toaster_9d6e054b03c6e5d1bea1c0a5576b4e6d () {
  const { resolvedColorMode } = useContext(ColorModeContext)


  refs['__toast'] = toast
  const [addEvents, connectErrors] = useContext(EventLoopContext);
  const toast_props = ({ ["description"] : ("Check if server is reachable at "+getBackendURL(env.EVENT).href), ["closeButton"] : true, ["duration"] : 120000, ["id"] : "websocket-error" });
  const [userDismissed, setUserDismissed] = useState(false);
  (useEffect(
() => {
    if ((connectErrors.length >= 2)) {
        if (!userDismissed) {
            toast.error(
                `Cannot connect to server: ${((connectErrors.length > 0) ? connectErrors[connectErrors.length - 1].message : '')}.`,
                {...toast_props, onDismiss: () => setUserDismissed(true)},
            )
        }
    } else {
        toast.dismiss("websocket-error");
        setUserDismissed(false);  // after reconnection reset dismissed state
    }
}
, [connectErrors]))

  return (
    <Toaster closeButton={false} expand={true} position={"bottom-right"} richColors={true} theme={resolvedColorMode}/>
  )
}

export function Iconbutton_52395c54b68ff5a6f498d43b99daaac3 () {
  const { toggleColorMode } = useContext(ColorModeContext)
  const [addEvents, connectErrors] = useContext(EventLoopContext);

  const on_click_9922dd3e837b9e087c86a2522c2c93f8 = useCallback(toggleColorMode, [addEvents, Event, toggleColorMode])


  return (
    <RadixThemesIconButton css={({ ["padding"] : "6px", ["position"] : "fixed", ["top"] : "2rem", ["right"] : "2rem", ["background"] : "transparent", ["color"] : "inherit", ["zIndex"] : "20", ["&:hover"] : ({ ["cursor"] : "pointer" }) })} onClick={on_click_9922dd3e837b9e087c86a2522c2c93f8}>
  <Fragment_eb4ad804ee463e78d3c73fc2a2903123/>
</RadixThemesIconButton>
  )
}

export function Fragment_e521b13e556da291bcec5187a783ea81 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    <Fragment>
  {isTrue((connectErrors.length > 0)) ? (
  <Fragment>
  <LucideWifiOffIcon css={({ ["color"] : "crimson", ["zIndex"] : 9999, ["position"] : "fixed", ["bottom"] : "33px", ["right"] : "33px", ["animation"] : (pulse+" 1s infinite") })} size={32}/>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment>
  <Div_24a2e81d0c5d3cb5b5f786fdef44e514/>
  <Toaster_9d6e054b03c6e5d1bea1c0a5576b4e6d/>
</Fragment>
  <RadixThemesBox css={({ ["width"] : "100vw", ["padding"] : "0" })}>
  <RadixThemesContainer css={({ ["padding"] : "0", ["width"] : "100%", ["maxWidth"] : "100vw", ["margin"] : "0" })} size={"3"}>
  <Iconbutton_52395c54b68ff5a6f498d43b99daaac3/>
  <RadixThemesFlex align={"start"} className={"rx-Stack"} direction={"column"} gap={"3"}>
  <RadixThemesHeading size={"20"}>
  {"RecycleMagic Dashboard"}
</RadixThemesHeading>
  <RadixThemesFlex css={({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })}/>
  <RadixThemesGrid css={({ ["templateColumns"] : "repeat(2, 1fr)", ["width"] : "100%" })} gap={"2"}>
  <RadixThemesCard css={({ ["width"] : "100%" })}>
  <RadixThemesHeading>
  {"Welcome!"}
</RadixThemesHeading>
  <ul css={({ ["direction"] : "column", ["listStyleType"] : "disc", ["marginLeft"] : "1.5rem" })}>
  <li>
  {"This is a dashboard for RecycleMagic."}
</li>
  <li>
  {"Data on this page is updated via refresh."}
</li>
  <li>
  {"Email us at kevin@recyclemagic.com for more information."}
</li>
</ul>
</RadixThemesCard>
  <RadixThemesCard css={({ ["width"] : "100%" })}>
  <RadixThemesHeading>
  {"Bottle Waste Management Bin Status"}
</RadixThemesHeading>
  <DataTableGrid columns={["bin_id", "type", "status"]} data={[[517, "SmartBin", "Ready for Pickup"], [444, "SmartBin", "Overflowing"], [367, "Reverse Vending Machine", "Normal"], [987, "Recycling Site", "Normal"], [986, "Recycling Site", "Normal"], [711, "Reverse Vending Machine", "Normal"], [984, "SmartBin", "Normal"], [409, "Recycling Site", "Overflowing"], [947, "SmartBin", "Overflowing"], [556, "Reverse Vending Machine", "Normal"], [515, "Recycling Site", "Overflowing"], [677, "Reverse Vending Machine", "Ready for Pickup"], [737, "SmartBin", "Normal"], [607, "SmartBin", "Normal"], [803, "SmartBin", "Normal"], [243, "Recycling Site", "Normal"], [848, "SmartBin", "Normal"], [439, "Reverse Vending Machine", "Normal"], [514, "SmartBin", "Overflowing"], [874, "SmartBin", "Normal"], [857, "Recycling Site", "Normal"], [620, "Recycling Site", "Normal"], [746, "Recycling Site", "Normal"], [324, "Reverse Vending Machine", "Normal"], [769, "Reverse Vending Machine", "Overflowing"], [610, "Recycling Site", "Ready for Pickup"], [544, "SmartBin", "Overflowing"], [563, "Reverse Vending Machine", "Normal"], [467, "Recycling Site", "Normal"], [392, "Recycling Site", "Normal"], [145, "SmartBin", "Normal"], [915, "Reverse Vending Machine", "Normal"], [309, "Reverse Vending Machine", "Ready for Pickup"], [205, "SmartBin", "Normal"], [556, "Reverse Vending Machine", "Normal"], [778, "SmartBin", "Normal"], [188, "Reverse Vending Machine", "Normal"], [963, "Reverse Vending Machine", "Normal"], [851, "Recycling Site", "Normal"], [272, "SmartBin", "Overflowing"], [421, "Recycling Site", "Normal"], [399, "Reverse Vending Machine", "Overflowing"], [651, "SmartBin", "Normal"], [550, "SmartBin", "Normal"], [265, "SmartBin", "Normal"], [417, "Recycling Site", "Normal"], [171, "SmartBin", "Ready for Pickup"], [866, "SmartBin", "Ready for Pickup"], [988, "Reverse Vending Machine", "Normal"], [294, "Reverse Vending Machine", "Normal"], [423, "Reverse Vending Machine", "Normal"], [978, "SmartBin", "Ready for Pickup"], [187, "Reverse Vending Machine", "Normal"], [513, "Reverse Vending Machine", "Normal"], [511, "SmartBin", "Normal"], [704, "Reverse Vending Machine", "Normal"], [256, "Reverse Vending Machine", "Normal"], [959, "SmartBin", "Normal"], [601, "Reverse Vending Machine", "Normal"], [385, "Reverse Vending Machine", "Normal"], [646, "Reverse Vending Machine", "Overflowing"], [547, "SmartBin", "Normal"], [755, "SmartBin", "Normal"], [305, "SmartBin", "Normal"], [524, "Reverse Vending Machine", "Ready for Pickup"], [126, "SmartBin", "Normal"], [735, "Recycling Site", "Normal"], [308, "Recycling Site", "Normal"], [456, "Recycling Site", "Normal"], [988, "Reverse Vending Machine", "Normal"], [172, "Recycling Site", "Normal"], [796, "Reverse Vending Machine", "Normal"], [757, "Reverse Vending Machine", "Overflowing"], [480, "Reverse Vending Machine", "Normal"], [457, "Recycling Site", "Overflowing"], [142, "Reverse Vending Machine", "Normal"], [661, "Recycling Site", "Normal"], [179, "SmartBin", "Normal"], [989, "SmartBin", "Normal"], [989, "Recycling Site", "Normal"], [133, "Recycling Site", "Normal"], [792, "Recycling Site", "Normal"], [483, "Recycling Site", "Normal"], [652, "Recycling Site", "Ready for Pickup"], [268, "SmartBin", "Ready for Pickup"], [669, "Reverse Vending Machine", "Normal"], [481, "SmartBin", "Normal"], [174, "Reverse Vending Machine", "Normal"], [438, "Recycling Site", "Normal"], [221, "Recycling Site", "Normal"], [934, "Reverse Vending Machine", "Normal"], [678, "Reverse Vending Machine", "Ready for Pickup"], [456, "Reverse Vending Machine", "Normal"], [585, "Reverse Vending Machine", "Normal"], [577, "Recycling Site", "Normal"], [468, "Reverse Vending Machine", "Normal"], [680, "Reverse Vending Machine", "Ready for Pickup"], [305, "Reverse Vending Machine", "Overflowing"], [716, "SmartBin", "Normal"], [690, "Reverse Vending Machine", "Normal"]]} pagination={true} search={true} sort={true}/>
</RadixThemesCard>
  <RadixThemesCard css={({ ["width"] : "100%" })}>
  <RadixThemesHeading>
  {"Bottle Status"}
</RadixThemesHeading>
  <DataTableGrid columns={["bottleID", "status"]} data={[["pepsi_bottle_2", "recycled"], ["water_bottle_1", "recycled"]]} pagination={true} search={true} sort={true}/>
</RadixThemesCard>
  <RadixThemesCard css={({ ["width"] : "100%" })}>
  <RadixThemesHeading>
  {"Processing Plant Tank Status"}
</RadixThemesHeading>
  <DataTableGrid columns={["tank", "status"]} data={[["sf-tank", "90% full"], ["ann-arbor-tank", "10% full"]]} pagination={true} search={true} sort={true}/>
</RadixThemesCard>
</RadixThemesGrid>
</RadixThemesFlex>
</RadixThemesContainer>
</RadixThemesBox>
  <NextHead>
  <title>
  {"Recyclemagic | Index"}
</title>
  <meta content={"favicon.ico"} property={"og:image"}/>
</NextHead>
</Fragment>
  )
}
