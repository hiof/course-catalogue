class CourseCatalogue {
  constructor() {
    this.view = new View(),
    this.svgArrow = this.view.getSvgIcon("arrow-right");
    this.btnApply = $("#program-KS602").next().find("a").addClass('btn-study-apply');
    this.movedFilter = false;
  }
  render(){
    this.duplicateStudyCourseFacts();
  }

  duplicateStudyCourseFacts(){

    var studyCourseFacts = $("#program-KS601").parent().clone(),
    btnApply = this.btnApply;


    $('.btn-study-apply span').remove();

    var btnApplyClone = btnApply.clone(),
    btnStudyModel = $(".study-plan-model-link").clone(),
    btnAdmission = $(btnStudyModel).clone().attr('href', '/?ID=30782').text('Slik søker du opptak');

    $(studyCourseFacts).addClass("study-course-facts").removeClass('lo-half');

    $('#sidebar').prepend(studyCourseFacts);
    //$(studyCourseFacts).insertAfter("#program-KS019");
    $(".study-course-facts h3").remove();
    $(".study-course-facts #knapp1").remove();
    $(".study-course-facts #toggleme").remove();
    $(".study-course-facts").append(btnStudyModel);
    $(".study-course-facts").append(btnAdmission);
    $(".study-course-facts").append(btnApplyClone);

    // Temporary change the apply-button text
    var now = new Date().getTime(),
    future = new Date('2017-02-01').getTime();
    if (now < future) {
      $(".btn-study-apply").each(function(index) {
        if (($(this).text() == 'Søk her før 1. mars! ') || ($(this).text() == 'Søk her før 1.mars! ')) {
          $('.btn-study-apply').text('SøknadsWeb logg inn');
        }
      });
    }
    this.addInternalNav();

  }

  addInternalNav(){
    let that = this;
    $("#nav-page").detach().insertAfter('#cover');
    $('#nav-page').removeClass('nav-page').addClass('navbar navbar-default').html(`<div class="container-fluid"><div class="" id="study-program-internal-nav"><ul class="nav navbar-nav"></ul></div></div>`);

    $('#content > :header').each(function(index){

      let hText = $.trim($(this).text());

      if ($(this).prop('nodeName') === 'H3') {
        if ($(this).attr('id') === 'program-KS602') {

          var btnApplyClone = that.btnApply.clone();

          let hApply = $(btnApplyClone).addClass('float-right');
          $('#nav-page ul').parent().append(hApply);

        }else{
          $('#nav-page ul').append('<li><a href="#' + $(this).attr('id') + '">'+ hText + '</a></li>');
        }
      }
    });

  }

  executeFilterFromUrl(){
    var searchTerm = Hiof.view.getUrlParameterByName("filterDepartment").toString();

    if (typeof searchTerm !== 'undefined') {
      return;
    }

    if (searchTerm.match("^ovrig")) {
      var newSearchTerm = searchTerm.split('_');
      newSearchTerm = newSearchTerm[1];
      searchTerm = "kat_" + newSearchTerm;
    }


    //// Legacy singleparam functionality
    if (typeof searchTerm != 'undefined' && searchTerm !== '') {
      var el = 'input[value=' + searchTerm + ']';
      $(el, '#studie .checkbox').trigger('click');
      filterData();
    }
  }

  filterData() {
    let thisFilter = $('form').serialize(),
    filter = "",
    totalCheckboxtypeStudy = $('input[name=typeStudy]:checked').length - 1,
    totalCheckboxFagomraader = $('input[name=fagomraader]:checked').length - 1,
    totalCheckboxOvrigeStudierAlternativer = $('input[name=OvrigeStudierAlternativer]:checked').length - 1,
    totalCheckboxStudiested = $('input[name=studiested]:checked').length - 1,
    totalCheckboxOppstart = $('input[name=oppstart]:checked').length - 1;


    if ($('input[name=typeStudy]').is(':checked')) {
      filter += "(?=.*(";
    }

    $('input[name=typeStudy]:checked').each(function(i, item) {
      if (this.checked) {
        if (i === totalCheckboxtypeStudy) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";
        }
      }
    });

    if ($('input[name=typeStudy]').is(':checked')) {
      filter += "))";

    }
    if ($('input[name=fagomraader]').is(':checked')) {
      filter += "(?=.*(";
    }
    $('input[name=fagomraader]:checked').each(function(i, item) {

      if (this.checked) {
        if (i === totalCheckboxFagomraader) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";

        }

      }
    });
    if ($('input[name=fagomraader]').is(':checked')) {
      filter += "))";
    }

    if ($('input[name=OvrigeStudierAlternativer]').is(':checked')) {
      filter += "(?=.*(";
    }
    $('input[name=OvrigeStudierAlternativer]:checked').each(function(i, item) {
      if (this.checked) {

        if (i === totalCheckboxOvrigeStudierAlternativer) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";

        }

      }
    });

    if ($('input[name=OvrigeStudierAlternativer]').is(':checked')) {
      filter += "))";
    }

    if ($('input[name=studiested]').is(':checked')) {
      filter += "(?=.*(";
    }

    $('input[name=studiested]:checked').each(function(i, item) {
      if (this.checked) {
        if (i === totalCheckboxStudiested) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";
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

      if (this.checked) {

        if (i === totalCheckboxOppstart) {
          filter += $(this).val() + "";
        } else {
          filter += $(this).val() + "|";

        }

      }
    });
    if ($('input[name=oppstart]').is(':checked')) {
      filter += "))";
    }

    $('#main table').trigger('footable_filter', {
      filter: filter
    });
    if (!$('#study-course-catalogue td .btn svg').length) {
      this.addArrowToCourseList();
    }
  };
  sortData(){
    $('th.footable-first-column').trigger('click');
  };
  resetFilter(url, section) {
    if (section) {
      $('input[name="' + section + '"]').prop('checked', false);
    } else {
      $('#studie')[0].reset();
    }
  };

  initatePathStudyCatalog() {
    // Load root path if no path is active
    Path.root("#/filter");
  };
  addArrowToCourseList(){
    let svgArrow = $(this.svgArrow).prop('outerHTML');
    $('#study-course-catalogue td .btn-primary').append(svgArrow);
  };
  activateInternalNav(){

    if ($('#main[data-page-category="study"]').length) {

      if (document.body.scrollTop > 130) {
        $('#nav-page').addClass('navbar-fixed-top');
      }else{
        $('#nav-page').removeClass('navbar-fixed-top');
      }
    }

  };
  toggleFilterOnSmallScreens(){
    if (window.innerWidth <= 795) {

      if (!this.movedFilter) {
        this.movedFilter = true;
        let sidebar = $('#study-filter').addClass('toggle-hidden').detach();
        $('<button id="toggle-filter" class="btn btn-primary float-right" style="margin-left:1rem;">Vis filter</button>').insertBefore('#study-search-reset');
        $(sidebar).appendTo( "#study-course-catalogue caption" );
      }
    }else{
      if (this.movedFilter) {
        this.movedFilter = false;
        $('#toggle-filter').remove();
        let sidebar = $('#study-filter').removeClass('toggle-hidden').detach();
        $(sidebar).appendTo( "#sidebar" );
      }
    }
  };
};

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
    setTimeout(function() {courseCatalogue.sortData();}, 10);
    setTimeout(function() {courseCatalogue.filterData();}, 1000);
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

  });

  if ($('#main[data-page-category="homepage"]') && (Hiof.Options.windowWidth <= 769)) {
    $('.study .nav li:first-child .btn').text('Se våre studier');
  }

  $('#content').on('click', '#toggle-filter', function(e){
    e.preventDefault();
    $('#study-filter').toggleClass('toggle-hidden');
  });

  // Check if you are on the study page
  if ($("#studie").length) {setTimeout(
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
      e.preventDefault();
    }
  });

  //KD: temporary hack
  $(document).on('click', '#knapp1', function(e) {
    e.preventDefault();
    $(this).toggleClass("btn-line");
    $('#toggleme').slideToggle();
  });

  if ($('#main[data-page-category="study"]').length) {
    $(document).on('click', '#nav-page li a', function(e) {
      e.preventDefault();
      let destination = $(this).attr('href');
      $.scrollTo($(destination), 150, {
        axis: 'y',
        offset: {
          top: -120
        }
      });
    });
  }
  if ($('.study-short-info-master-acs').length) {
    courseCatalogue.addInternalNav();
    let newShortInfo = $('.study-short-info-master-acs').clone();

    $('#sidebar').append(newShortInfo);
  }

  $('#study-course-catalogue th:nth-of-type(2)').trigger("click");

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
    courseCatalogue.toggleFilterOnSmallScreens();
  }).resize();

  $(window).scroll(function () {
    courseCatalogue.activateInternalNav();
  });

});
