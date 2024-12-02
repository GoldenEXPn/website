import React, {forwardRef} from "react";
import { cn } from "../../lib/utils";

const MaxWidthWrapper = forwardRef(({ className, children }
// : {
//   className?: string
//   children: ReactNode } 
, ref) => {
  return (
    <div ref={ref} className={cn('mx-auto w-full max-w-screen-large px-2.5 medium:px-20', className)}>
      {children}
    </div>
  )
});

export default MaxWidthWrapper;
