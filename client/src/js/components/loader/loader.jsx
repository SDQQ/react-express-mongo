import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = ({rectData}) =>{

  if(rectData){
    const rectWidth = rectData.width * 70 / 100
    return <ContentLoader 
    speed={2}
    width={rectData.width}
    height={950}
    viewBox={`0 0 ${rectData.width} 950`}
    backgroundColor="#afafd0"
    foregroundColor="#b30000"
    >
    <rect x="0" y="0" rx="18" ry="18" width={`${rectWidth}`} height="224" /> 
    <rect x={rectData.width-rectWidth-20} y="240" rx="18" ry="18" width={`${rectWidth}`} height="224" /> 
    <rect x="0" y="480" rx="18" ry="18" width={`${rectWidth}`} height="224" /> 
    <rect x={rectData.width-rectWidth-20} y="720" rx="18" ry="18" width={`${rectWidth}`} height="224" /> 
    </ContentLoader>
  }
  return  <ContentLoader 
    speed={2}
    width={510}
    height={1100}
    viewBox="0 0 510 1100"
    backgroundColor="#afafd0"
    foregroundColor="#b30000"
  >
    <rect x="0" y="0" rx="18" ry="18" width="410" height="224" /> 
    <rect x={410} y="240" rx="18" ry="18" width="410" height="224" /> 
    <rect x="0" y="480" rx="18" ry="18" width="410" height="224" /> 
    <rect x="100" y="720" rx="18" ry="18" width="410" height="224" /> 
  </ContentLoader>
}

export default MyLoader