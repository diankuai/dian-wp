Zepto(function($) {

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

var params = getSearchParameters();

  $('.code').html(params.code);
  $('.state').html(params.state);
  $('input[name=table_type]').change(function () {
    $('.table-type-wrap label').removeClass('active');
    $(this).next().toggleClass('active');
  });
  $('input[name="table_type"]').closest('label').toggleClass('active');
})
