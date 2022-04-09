document.querySelectorAll( "form.userDetails input" ).forEach( ( inputElement ) => {
  inputElement.addEventListener( "input", () => {
    document.querySelector( "form.userDetails button[type=submit]" ).removeAttribute( 'disabled' )
  } )
} )
