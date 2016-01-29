class CourseCatalogue {
  constructor() {

  }
  render(){
    this.duplicateStudyCourseFacts();
  }

  duplicateStudyCourseFacts(){

    var studyCourseFacts = $("#program-KS601").parent().clone(),
    btnApply = $("#program-KS602").next().find("a").addClass('btn-study-apply');


    $('.btn-study-apply span').remove();

    var btnApplyClone = btnApply.clone(),
    btnStudyModel = $(".study-plan-model-link").clone();

    $(studyCourseFacts).addClass("study-course-facts");


    $(studyCourseFacts).insertAfter("#program-KS019");
    $(".study-course-facts h3").remove();
    $(".study-course-facts #knapp1").remove();
    $(".study-course-facts #toggleme").remove();
    $(".study-course-facts").append(btnStudyModel);
    $(".study-course-facts").append(btnApplyClone);

    //console.log(studyCourseFacts);

    // Temporary change the apply-button text
    var now = new Date().getTime(),
    future = new Date('2016-02-01').getTime();
    if (now < future) {
      $(".btn-study-apply").each(function(index) {
        if (($(this).text() == 'Søk her før 15. april! ') || ($(this).text() == 'Søk her før 1. mars! ') || ($(this).text() == 'Søk her før 1.mars! ')) {
            $('.btn-study-apply').text('Søking åpner 1. februar');
        }
      });
    }
    //console.log('duplicateStudyCourseFacts is called');
  }



  executeFilterFromUrl(){
    var searchTerm = Hiof.getUrlParameterByName("filterDepartment").toString();
    //var multiFilter = Hiof.getUrlParameterByName("filter").toString();
    //var filter = '';
    //debug("Singlefilter: " + singleFilter);
    //console.log("multiFilter: " + multiFilter);
    //console.log('---------------------------------------------');



    //debug('SearchTerm: ' +searchTerm);

    //var filterValues;
    //
    //if(singleFilter !== ''){
    //  filterValues = singleFilter;
    //}
    //if(multiFilter !== ''){
    //  filterValues = multiFilter;
    //}

    //console.log("Filtervalue: " + filterValues);
    //console.log('---------------------------------------------');

    if (typeof searchTerm !== 'undefined') {
      //console.log('searchTerm is empty');
      return;
    }

    //console.log(filterValues);







    if (searchTerm.match("^ovrig")) {
      var newSearchTerm = searchTerm.split('_');
      newSearchTerm = newSearchTerm[1];
      searchTerm = "kat_" + newSearchTerm;
    }



    // Multiparam functionality



    //    if (filterValues !== '') {
    //      filterValues.replace(/%2C/g, ',');
    //      //console.log("filterValues = ");
    //      //console.log(filterValues);
    //      var thisFilter = filterValues.split(',');
    //      //console.log("thisFilter = ");
    //      //console.log(thisFilter);
    //      $.each(thisFilter, function(key, value) {
    //        //console.log("value = ");
    //        //console.log(value);
    //        $('input[value="' + value + '"]').trigger('click');
    //      });
    //      //return;
    //    }



    //// Legacy singleparam functionality
    if (typeof searchTerm != 'undefined' && searchTerm !== '') {
      var el = 'input[value=' + searchTerm + ']';
      //filter = "(?=.*(" + searchTerm + "))";
      //console.log(filter);

      $(el, '#studie .checkbox').trigger('click');
      filterData();
      //  //setTimeout(
      //  //  function() {
      //  //    $('#main table').trigger('footable_filter', {
      //  //      filter: filter
      //  //    });
      //  //  }, 1000);
      //
    }
  }




  filterData() {
    let thisFilter = $('form').serialize(),
    //thisValue = $(element).attr('value'),
    filter = "",
    totalCheckboxtypeStudy = $('input[name=typeStudy]:checked').length - 1,
    totalCheckboxFagomraader = $('input[name=fagomraader]:checked').length - 1,
    totalCheckboxOvrigeStudierAlternativer = $('input[name=OvrigeStudierAlternativer]:checked').length - 1,
    totalCheckboxStudiested = $('input[name=studiested]:checked').length - 1,
    totalCheckboxOppstart = $('input[name=oppstart]:checked').length - 1;


    //debug(thisFilter);
    //Update the URL from the form filter
    //updateUrl(thisFilter);
    //console.log("Total checkbox: " + totalCheckbox);

    if ($('input[name=typeStudy]').is(':checked')) {
      filter += "(?=.*(";
    }


    $('input[name=typeStudy]:checked').each(function(i, item) {
      //console.log("Filter for typeStudy");

      if (this.checked) {

        //console.log('Item is:' + i);
        if (i === totalCheckboxtypeStudy) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";
          //console.log($(this).val());
        }


      }
    });

    if ($('input[name=typeStudy]').is(':checked')) {
      filter += "))";

    }
    //console.log(filter);
    //console.log("------------------------");



    if ($('input[name=fagomraader]').is(':checked')) {
      filter += "(?=.*(";
    }


    $('input[name=fagomraader]:checked').each(function(i, item) {
      //console.log("Filter for fagomraader");

      if (this.checked) {
        //filter += "(";
        //console.log('Item is:' + i);
        if (i === totalCheckboxFagomraader) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";
          //console.log($(this).val());
        }

        //filter += ")";
      }
    });
    if ($('input[name=fagomraader]').is(':checked')) {
      filter += "))";
    }
    //console.log(filter);
    //console.log("------------------------");


    if ($('input[name=OvrigeStudierAlternativer]').is(':checked')) {
      filter += "(?=.*(";
    }
    $('input[name=OvrigeStudierAlternativer]:checked').each(function(i, item) {
      //console.log("Filter for OvrigeStudierAlternativer");

      if (this.checked) {
        //console.log('Item is:' + i);
        if (i === totalCheckboxOvrigeStudierAlternativer) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";
          //console.log($(this).val());
        }

      }
    });

    if ($('input[name=OvrigeStudierAlternativer]').is(':checked')) {
      filter += "))";
    }


    //console.log(filter);
    //console.log("------------------------");



    if ($('input[name=studiested]').is(':checked')) {
      filter += "(?=.*(";
    }

    $('input[name=studiested]:checked').each(function(i, item) {
      //console.log("Filter for studiested");
      if (this.checked) {
        //console.log('Item is:' + i);
        if (i === totalCheckboxStudiested) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";
          //console.log($(this).val());
        }

      }
    });
    if ($('input[name=studiested]').is(':checked')) {
      filter += "))";
    }

    if ($('input[name=oppstart]').is(':checked')) {
      filter += "(?=.*(";
    }

    $('input[name=oppstart]:checked').each(function(i, item) {
      //console.log("Filter for oppstart");
      if (this.checked) {
        //console.log('Item is:' + i);
        if (i === totalCheckboxOppstart) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";
          //console.log($(this).val());
        }

      }
    });
    if ($('input[name=oppstart]').is(':checked')) {
      filter += "))";
    }


    //
    //debug('Full filter: '+filter);
    //console.log("------------------------");
    $('#main table').trigger('footable_filter', {
      filter: filter
    });
  };


  resetFilter(url, section) {
    //$('#studie .checkbox input').each(function(){
    //  this.prop('checked', false);
    //});
    if (url) {
      //var newPage = '#/filter';
      //window.location.hash = newPage;
      //$('table').data('footable-filter').clearFilter();
    }


    if (section) {
      //debug('Reset section-filter initiated, section: ' + section);
      $('input[name="' + section + '"]').prop('checked', false);
      //$('input[name="' + section + '"]')[0].prop('checked', true);
    } else {
      //debug('Reset whole filter initiated');
      $('#studie')[0].reset();
      //$('table').data('footable-filter').clearFilter();
    }

  }

  initatePathStudyCatalog() {
    // Load root path if no path is active
    Path.root("#/filter");
  }


}

$(function() {
  let courseCatalogue = new CourseCatalogue();


  Path.map("#/filter").to(function() {
    //scrollDest = false;
    courseCatalogue.resetFilter(true);
    courseCatalogue.filterData();
  });
  Path.map("#/filter/").to(function() {
    //scrollDest = false;
    courseCatalogue.resetFilter(true);
    courseCatalogue.filterData();
  });

  Path.map("#/filter/:values").enter(function() {
    //Reset checkboxes
    courseCatalogue.resetFilter();
  }).to(function() {

    var thisValue = this.params.values;

    thisValue.replace(/%2C/g, ',');

    var thisFilter = thisValue.split(',');


    $.each(thisFilter, function(key, value) {
      var thisCheckbox = $('input[value="' + value + '"]');
      // If all study-types / all categories / all locations are clicked, do this, then else
      if (value === 'sttype_all' || value === 'kat_all' || value === 'camp_all') {
        var thisCheckboxName = thisCheckbox.attr('name');

      } else {
        thisCheckbox.prop('checked', true);
      }

    });
    courseCatalogue.filterData();
  });



  //courseCatalogue.render();


  if ($("#studie").length) {
    courseCatalogue.initatePathStudyCatalog();
    // Initiate Pathjs listener
    Path.listen();
    // Initiate filter 1 second after the page is loaded
    setTimeout(
      function() {
        courseCatalogue.filterData();
      }, 1000);
      //Enable reset-filter functionality
      $('#study-search-reset').on('click', function(e) {
        e.preventDefault();
        courseCatalogue.resetFilter(true);
      });
    }


    $(document).on('click', '#studie .checkbox input', function(e) {
      let thisFilter = [];

      $('#studie .checkbox input:checked').each(function() {
        thisFilter.push($(this).val());
      });
      let newPage = '#/filter/' + thisFilter.toString();
      //e.preventDefault();
      //debug(newPage);
      window.location.hash = newPage;
      //Path.dispatch('#/filter/' + thisFilter);
      //if(filter !== ''){
      //  var thisUrl = document.URL,
      //      thisValue = $(this).val();
      //  //debug('thisUrl' + thisUrl);
      //}
    });




    if ($('#main[data-page-category="homepage"]') && (Hiof.Options.windowWidth <= 769)) {
      $('.study .nav li:first-child .btn').text('Se våre studier');
    }


    // Filter based on the checkboxes
    $(document).on('change', '#studie .checkbox input', function(e) {
      //filterData();
    });




    // Check if you are on the study page
    if ($("#studie").length) {
      setTimeout(
        function() {
          courseCatalogue.executeFilterFromUrl();
        }, 1000);
      }
      // Check if you are within a study-page
      if ($("#program-KS601").length) {
        courseCatalogue.duplicateStudyCourseFacts();
      }

      // Fix the name of a studyplan on the Norwegian page
      if ($(".lang-nb #KS033").length > 0) {
        var showDetailsUrl = $("#content a").first().attr('href');
        //console.log("showDetailsUrl" + showDetailsUrl);

        if ($('#content .studieinfoAltDescriptions').length) {

        } else {

          if (showDetailsUrl.toLowerCase().indexOf("studieplaner") >= 0) {
            var showDetails = $("#content a").first(),
            newShowDetails = $(showDetails).clone().addClass("btn btn-primary").text("Vis studie-/fagplan med emnebeskrivelse");
            $(showDetails).remove();
            $("#content h1").first().remove();
            $("#content h2").first().after(newShowDetails);
            $("#content h2").first().detach().appendTo("#content header");
            $('#content header').find('h2').replaceWith(function() {
              return '<h1>' + $(this).text() + '</h1>';
            });
          }
        }

      }


      $('#studie').on('keypress keydown keyup', function(e) {
        if (e.keyCode == 13) {
          //console.log("Enter pressed...");
          e.preventDefault();
        }
      });


      //KD: temporary hack
      $(document).on('click', '#knapp1', function(e) {
        e.preventDefault();
        $(this).toggleClass("btn-line");
        $('#toggleme').slideToggle();
      });

      //$(document).on('click', '.semester-start-details-item', function(e) {
      //    e.preventDefault();
      //    $(this).toggleClass("open");
      //
      //});

      // Adjust the size of embeded videoes in the study calague
      let allVideos = $("iframe[src^='https://player.vimeo.com'], iframe[src^='//www.youtube.com'], object, embed"),
      fluidEl = $("#content");

      allVideos.each(function() {
        // jQuery .data does not work on object/embed elements
        $(this).attr('data-aspect-ratio', this.height / this.width).removeAttr('height').removeAttr('width');
      });
      $(window).resize(function() {
        var newWidth = fluidEl.width();
        allVideos.each(function() {
          let el = $(this);
          el.width(newWidth).height(newWidth * el.attr('data-aspect-ratio'));
        });
      }).resize();

    });
