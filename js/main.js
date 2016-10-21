$(document).ready(function() {
    //shrinks the header 
    $('#dropdown').on('change', function() {
        $('header').addClass('headerShrink');
    });
    //shows the loading image when selection is chosen from drop down.
    $('#dropdown').on('change', function() {
        $('.loading-gif').show();
    })


    $("#dropdown").on('change', function(event) {
        event.preventDefault();
        // console.log('hope');
        var selected = $('#dropdown').val();
        var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
        url += '?' + $.param({
            'api-key': "dc5656d92ff342a29d20a1cc5a35b0c0"
        })

        $.ajax({
            url: url,
            method: 'GET',

        }).done(function(data) {
            // console.log(data);
            var article = "";
            var dataResults = data.results.filter(function(value) {
                return value.multimedia.length >= 5;
            })
            dataResults.splice(12);

            $.each(dataResults, function(key, value) {


                var picture = value.multimedia[4].url,
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

                $(".top-news").html(article)
            });

            // $("top-stories").mouseenter('li', function() {
            //     $(this).find('.abstract').slideUp(1000);
            // })
        }).fail(function(err) {
            throw err;
        })

        .always(function() {
            $('.loading-gif').hide();
        })
    });
});