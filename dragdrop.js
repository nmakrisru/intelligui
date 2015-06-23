$(function() {
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".portlet-header",
      placeholder: "portlet-placeholder ui-corner-all",
      cursor: "move"
    });
 
    $( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
 

    
    $( ".column1" ).sortable({
      connectWith: ".column",
      handle: ".portlet-header",
      placeholder: "portlet-placeholder ui-corner-all"
    });
    
    $( ".column2" ).sortable({
      connectWith: ".column",
      handle: ".portlet-header",
      placeholder: "portlet-placeholder ui-corner-all"
    });
});