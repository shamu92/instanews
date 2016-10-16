$(document).ready(function() {

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
                console.log(data);
                $(".top-news").empty()
                $.each(data.results, function(key, value) {
                    // var background = "<li>";
                    // background += "<div class='articleBackground' style='background-image:url(";
                    // background += value.multimedia[4].url;
                    // background += +")'></div></li>";
                    console.log(value.multimedia[4].url)
                    if (value.multimedia.length > 0) {
                        $(".top-news").append("<li>" + "<a href=" + value.url + '>' + "<p class='abstract'>" + value.abstract + '</p>' + "<div class='articleBackground' style='background-image:url(" + value.multimedia[4].url + ")'></div></a></li>");
                    }
                });

            }).fail(function(err) {
                throw err;

            }) // console.log(result);

    });
});