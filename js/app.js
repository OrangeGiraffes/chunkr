$(".LoginRegisterContainer ul li").click(function(){
   alert('hey');  
   if(!$(this).hasClass('active')){
      $(".LoginRegisterContainer .tabs li").each(function(){
         
         $(this).removeClass('active');
      });
      var thisName = $(this).prop("class");
      $(this).addClass('active');
      
      if(name == 'register'){
         $(".loginForm").removeClass('active');
         $(".loginForm").addClass('hidden');
         $(".registerForm").removeClass('hidden');
         $(".registerForm").addClass('active');
         
      } else {
         $(".registerForm").removeClass('active');
         $(".registerForm").addClass('hidden');
         $(".loginForm").removeClass('hidden');
         $(".loginForm").addClass('active');
      }
      
   }
});