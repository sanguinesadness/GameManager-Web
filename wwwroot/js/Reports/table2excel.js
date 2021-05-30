$('#excel-export-button').click(() => {
    const queryTitle = document.getElementById('query-title').innerText;

    let fileName = queryTitle ? queryTitle : "report_result";

    $("#query-table").table2excel({
        name: fileName,
        filename: fileName,
        fileext: ".xls",
        preserveColors: true
    });
});