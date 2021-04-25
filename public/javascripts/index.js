$.ajaxSetup({async:false});



function returnName(){

   return 'kyle';
}


function checkTheLogin(un, pw){
   
   var result = '';  
   $.post( "/checkTheLogin", { username: un, password: pw })
      .done(function( data ) {
      
      
        // say what the account type is
        //alert( "Data Loaded: " + data );
        
        
        

        
        result = data;
        
        
     
        
        
      });
  
  return result;
    
        
}



function getTheProducts(){
   
   var result = '';  
   $.get( "/getProducts", { })
      .done(function( data ) {
      
      
       
        
        

        
        result = data;
        
        
     
        
        
      });
  
  return result;
    
        
}