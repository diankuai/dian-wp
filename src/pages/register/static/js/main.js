Zepto(function($) {

  /* lib */
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


  /* get paramters */
  var params = getSearchParameters();
  var code = params.code;
  var restaurant_openid = params.state;
  console.log(params);

  var api_domain = 'http://dev.dk26.com:8080/';

  /* get member info */
  $.getJSON(api_domain + 'wp/account/get-member/',
    $.param({
      'code': code
    }),
    function (data, status, xhr) {
      console.log(data);
      // render form fields
      $('form input[name=wp_openid]').val(data.wp_openid);
      // render form fields
      $('form input[name=restaurant_openid]').val(restaurant_openid);
    }
  );

  /* get restaurant info */
  $.getJSON(api_domain + 'wp/restaurant/get-restaurant/',
    $.param({
      'openid': restaurant_openid
    }),
    function (data, status, xhr) {
      // render title
      $('#restaurant_name').text(data.name);
    }
  );

  /* get restaurant's table-type */
  $.getJSON(api_domain + 'wp/table/list-table-type-by-restaurant/',
    $.param({
      'openid': restaurant_openid 
    }),
    function (data, status, xhr) {
      $(data).each(function (index, item) {

        var tte = $('<div></div>');
        tte.attr('class', 'table-type-wrap');

        var ie = $('<input></input>');
        ie.attr('type', 'radio');
        ie.attr('name', 'table_type');
        ie.attr('value', item.id);
        ie.attr('id', 'table_type_' + item.id);
        
        var le = $('<label></label>');
        le.attr('for', 'table_type_' + item.id);
        le.text(item.name + '(' + item.min_seats + ' - ' + item.max_seats + ')');

        tte.append(ie);
        tte.append(le);

        $('form button[type=submit]').before(tte);
      });

      /* bind event */
      $('input[name=table_type]').change(function () {
        $('.table-type-wrap label').removeClass('active');
        $(this).next().toggleClass('active');
      });
      $('input[name="table_type"]').closest('label').toggleClass('active');

    }
  );

  /* submit form */
  $('form').submit(function () {
    $.post(api_domain + 'wp/registration/confirm-table-type/',
      $('form').serialize(),
      function(data, status, xhr){
        alert('恭喜，取得 ' + data.queue_name + ' ' + data.queue_number + '号，前面还有' + data.waiting_count + '位等待');
      }
    );
    return false;
  });

});
