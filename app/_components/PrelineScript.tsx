"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const loadPreline = async () => {
      await import("preline/preline");

      window.HSStaticMethods.autoInit([
        'dropdown', 'stepper', 'select', 'hsselect', 'tab', 'modal', 'collapse', 'accordion'
      ]);
    };

    loadPreline();
  }, [path]);

  return null;
}
// "use client";

// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

// const isBrowser = typeof window !== undefined; // check if component is rendered in a browser

// export default function PrelineLoader() {
//   const path = usePathname();

//   useEffect(() => {
//     if (isBrowser) {
//       // if this component is rendered on a browser, import preline
//       import("preline/preline");
//     }
//   }, [])

//   useEffect(() => {
//     setTimeout(() => {
//       if (isBrowser) {
//         // if this component is rendered on a browser, import relevant preline plugins
//         import("preline/preline").then(({ HSStaticMethods}) => {
//           HSStaticMethods.autoInit();
//         })
//       }
//     }, 100)
//   }, [path])

//   return <></>
// }