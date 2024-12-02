import { redirect } from "react-router-dom"

export const handleGoogleCallback = async (request) => {
    const url = new URL(request.url);
    console.log("Google sign in authorization response: ", url)
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error){
        return redirect('/login?error=access_denied')
    }

    if (!code){
        return redirect('/login')
    }

    
};

