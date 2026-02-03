import { useState } from "react";

import TemplateKiri from "@/pages/login/templateKiri";
import TemplateKanan from "@/pages/login/templateKanan";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            {/* LEFT - Branding (Desktop Only) */}
            <TemplateKiri/>

            {/* RIGHT - Form */}
            <TemplateKanan showPassword={showPassword} setShowPassword={setShowPassword} />
        </div>
    )
}

export default Login