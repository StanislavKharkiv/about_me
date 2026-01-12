import dynamic from "next/dynamic"

export default dynamic(() => import("./NeonLights"), { ssr: false })
