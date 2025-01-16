const adminAuth = (req,resizeBy,next)=>{
    const token = "xyz"
    const isAuthenticated = token === "xyz"

    if(!isAuthenticated){
        res.send("unaurhoeise user")
    }
    next()
}