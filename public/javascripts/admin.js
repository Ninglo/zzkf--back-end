function showFindForm() {
    document.getElementById('findForm').style.display = 'block';
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('insertForm').style.display = 'none';
}

function showInsertForm() {
    document.getElementById('insertForm').style.display = 'block';
    document.getElementById('findForm').style.display = 'none';
    document.getElementById('userInfo').style.display = 'none';
}
