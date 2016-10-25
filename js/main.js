$(document).ready( function() {
//shrinks the header 

//shows the loading image when selection is chosen from drop down.
// $('#dropdown').on('change', function() {
//     $('.loading-gif').show();
// })



$("#dropdown").on('change', (event) => {
    $('header').addClass('headerShrink');
    //shrinks the header  
    $('.loading').show();
    //shows the loading image when selection is chosen from drop down.
    // event.preventDefault();
    // console.log('hope');
    // you could add a way to delete the selection category after.
    let selected = $('#dropdown').val();
    let url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url += '?' + $.param({
        'api-key': "dc5656d92ff342a29d20a1cc5a35b0c0"
    })

    $.ajax({
        url: url,
        method: 'GET',

    }).done(function(data) {
        // console.log(data);
        let article = "";
        let dataResults = data.results.filter((value) => {
            return value.multimedia.length >= 5;
        })
        dataResults.splice(12);

        $.each(dataResults, (key, value) => {


            let picture = value.multimedia[4].url,
                abstract = value.abstract,
                articleUrl = value.url;

            article += "<li>";
            article += "<a href=" + articleUrl + '>';
            article += "<div class='articleBackground' style='background-image:url(";
            article += picture;
            article += ")'><p class='abstract'>";
            article += abstract;
            article += "</p></div></a></li>";
            // console.log(picture);

        });
        $(".top-news").html(article)
            // $("top-stories").mouseenter('li', function() {
            //     $(this).find('.abstract').slideUp(1000);
            // })
    }).fail(function(err) {
        throw err;
        // There isint anything happening if NYT doesnt reply

    })

    .always(() => {
        $('.loading-gif').hide();
    })
});
})