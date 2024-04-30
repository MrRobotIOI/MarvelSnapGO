import React from 'react';
import SigninButton from "@/app/components/SigninButton";

function Appbar() {
    return (
       <header className={'flex'}>

           <SigninButton />
       </header>
    );
}

export default Appbar;