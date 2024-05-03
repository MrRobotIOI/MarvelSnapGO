import React from 'react';
import SigninButton from "@/app/components/SigninButton";

function Appbar() {
    return (
       <header className={' pb-4'}>

           <SigninButton />
       </header>
    );
}

export default Appbar;