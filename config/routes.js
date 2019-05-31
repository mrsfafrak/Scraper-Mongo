module.exports = function(router){
    // homepage
    router.get("/",function(req,res){
        res.render("home");
    });
    // saved page
    router.get("/saved", function(req,res){
        res.render("saved");
    });
}