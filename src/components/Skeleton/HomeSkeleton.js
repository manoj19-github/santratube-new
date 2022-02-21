import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const HomeSkeleton = () => {
    return (
        <div style={{
          width:"100%",
          margin:"1rem 0"
        }}>
        <SkeletonTheme
          color="#343a40"
          highlightColor="#3c4147"
        >
          <Skeleton height={180} />
        <div style={{width:"100%"}} className="d-flex">
            <Skeleton style={{margin:"0.5rem"}} circle height={40} width={40}/>
          <Skeleton style={{margin:"0.5rem"}}  height={40} width={180}/>
          </div>
        </SkeletonTheme>

        </div>
    )
}

export default HomeSkeleton
