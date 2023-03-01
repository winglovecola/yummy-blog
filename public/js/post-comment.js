const postFormHandler = async (event) => {
  event.preventDefault();
  const postId = document.querySelector('#postid').value.trim();
  const commentId = document.querySelector('#commentid').value.trim();
  const commentDetail = document.querySelector('#comment-detail').value.trim();
  let fetchUrl = "", postMethod = "";
  if (commentDetail) {

    fetchUrl = "/api/post-comment/" + commentId;
    postMethod = "PUT";



    const response = await fetch(fetchUrl, {
      method: postMethod,
      body: JSON.stringify({ commentDetail }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/post/' + postId);
    } else {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;
    
      //console.log (data.errors[0].message);
      //document.querySelector('#signup-status').innerHTML = data.errors.message;
    }
  }
};


const postDelete = async () => {
  document.querySelector('#delete-confirmation').style.display = "block";
  document.querySelector('#post-delete').style.display = "none";
};

const postDeleteNo = async () => {
  document.querySelector('#delete-confirmation').style.display = "none";
  document.querySelector('#post-delete').style.display = "block";
};

const postDeleteYes = async () => {
  const postId = document.querySelector('#postid').value.trim();
  const commentId = document.querySelector('#commentid').value.trim();


  let fetchUrl = "", postMethod = "";
  fetchUrl = "/api/post-comment/" + commentId;
  postMethod = "DELETE";

    const response = await fetch(fetchUrl, {
      method: postMethod,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/post/' + postId);
    } else {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;
    
      //console.log (data.errors[0].message);
      //document.querySelector('#signup-status').innerHTML = data.errors.message;
    }

};


document.querySelector('#post-submit').addEventListener('click', postFormHandler);
document.querySelector('#post-delete').addEventListener('click', postDelete);
document.querySelector('#post-delete-no').addEventListener('click', postDeleteNo);
document.querySelector('#post-delete-yes').addEventListener('click', postDeleteYes);