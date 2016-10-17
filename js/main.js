$(document).ready(function() {

    $('#dropdown').on('change', function() {
        $('header').addClass('headerShrink');
    });

    $('#dropdown').on('change', function() {
        $('.loading').show();
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
            $('.top-news').empty()
            $.each(data.results, function(key, value) {

                if (value.multimedia.length > 0) {

                    var picture = value.multimedia[4].url,
                        abstract = value.abstract,
                        articleUrl = value.url,

                        article = "<li>";
                    article += "<a href=" + articleUrl + '>';
                    article += "<div class='articleBackground' style='background-image:url(";
                    article += picture;
                    article += ")'><p class='abstract'>";
                    article += abstract;
                    article += "</p></div></a></li>";

                    // console.log(picture);

                    $(".top-news").append(article)
                }
            });

        }).fail(function(err) {
            throw err;
        })

        .always(function() {
            $('.loading').hide();
        })
    });
});