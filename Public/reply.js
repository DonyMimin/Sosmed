document.getElementById('submit-button').addEventListener('click', function() {
  var commentInput = document.getElementById('comment-input');
  var commentText = commentInput.value;

  if (commentText.trim() !== '') {
    var commentSection = document.querySelector('.comment-section');
    createComment(commentText, commentSection);
    commentInput.value = '';
  }
});

function createComment(commentText, commentSection) {
  var comment = document.createElement('div');
  comment.classList.add('comment');

  var profilePicture = document.createElement('img');
  profilePicture.classList.add('profile-picture');
  profilePicture.src = 'R.png';
  profilePicture.alt = 'Profile Picture';

  var commentContent = document.createElement('div');
  commentContent.classList.add('comment-content');

  var commentHeader = document.createElement('div');
  commentHeader.classList.add('comment-header');

  var usernameElement = document.createElement('h3');
  usernameElement.classList.add('username');
  usernameElement.textContent = 'Blo'; // Customize the username here

  var commentTextElement = document.createElement('p');
  commentTextElement.classList.add('comment-text');
  commentTextElement.textContent = commentText;

  var replyButton = document.createElement('button');
  replyButton.classList.add('reply-button');
  replyButton.textContent = 'Reply';

  var replies = document.createElement('div');
  replies.classList.add('replies');

  commentHeader.appendChild(usernameElement);
  commentContent.appendChild(commentHeader);
  commentContent.appendChild(commentTextElement);
  commentContent.appendChild(replyButton);
  commentContent.appendChild(replies);

  comment.appendChild(profilePicture);
  comment.appendChild(commentContent);

  replyButton.addEventListener('click', function() {
    var replyInput = createReplyInput();
    commentContent.appendChild(replyInput);
  });

  commentSection.appendChild(comment);
}

// Rest of the code...

async function createReply(replyText) {
  // ...

  var username = document.createElement('h3');
  username.classList.add('username');
  username.textContent = await getCurrentUsername(); // Get the current username from the server

  // ...
}


function createReplyInput() {
  var replyInput = document.createElement('textarea');
  replyInput.classList.add('reply-input');
  replyInput.placeholder = 'Write a reply...';

  var submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.textContent = 'Submit';

  submitButton.addEventListener('click', function() {
    var replyText = replyInput.value;

    if (replyText.trim() !== '') {
      var reply = createReply(replyText);
      var replies = replyInput.parentNode.querySelector('.replies');
      replies.appendChild(reply);
      replyInput.parentNode.removeChild(replyInput);
    }
  });

  var replyInputContainer = document.createElement('div');
  replyInputContainer.classList.add('reply-input-container');
  replyInputContainer.appendChild(replyInput);
  replyInputContainer.appendChild(submitButton);

  return replyInputContainer;
}

function createReply(replyText) {
  var reply = document.createElement('div');
  reply.classList.add('reply');

  var profilePicture = document.createElement('img');
  profilePicture.classList.add('profile-picture');
  profilePicture.src = 'R.png';
  profilePicture.alt = 'Profile Picture';

  var replyContent = document.createElement('div');
  replyContent.classList.add('reply-content');

  var replyHeader = document.createElement('div');
  replyHeader.classList.add('reply-header');

  var username = document.createElement('h3');
  username.classList.add('username');
  username.textContent = getCurrentUsername(); // Get the current username from the server

  var replyTextElement = document.createElement('p');
  replyTextElement.classList.add('reply-text');
  replyTextElement.textContent = replyText;

  var replyButton = document.createElement('button');
  replyButton.classList.add('reply-button');
  replyButton.textContent = 'Reply';

  replyHeader.appendChild(username);
  replyContent.appendChild(replyHeader);
  replyContent.appendChild(replyTextElement);
  replyContent.appendChild(replyButton);

  reply.appendChild(profilePicture);
  reply.appendChild(replyContent);

  replyButton.addEventListener('click', function() {
    var replyInput = createReplyInput();
    replyContent.appendChild(replyInput);
  });

  return reply;
}

// Helper function to get the current username from the server
function getCurrentUsername() {
  // Make a request to the server to get the current user's username
  // Replace 'api/getUsername' with the appropriate endpoint on your server
  return fetch('/api/getUsername')
    .then(response => response.text())
    .catch(error => {
      console.error('Error retrieving current username:', error);
      return 'Woku'; // Return a default username in case of error
    });
}

// Function to create a comment
async function createComment(commentText, commentSection) {
  

  var comment = document.createElement('div');
  comment.classList.add('comment');

  

  var profilePicture = document.createElement('img');
  profilePicture.classList.add('profile-picture');
  profilePicture.src = 'profil6.png';
  profilePicture.alt = 'Profile Picture';

  var commentContent = document.createElement('div');
  commentContent.classList.add('comment-content');

  var commentHeader = document.createElement('div');
  commentHeader.classList.add('comment-header');

  var usernameElement = document.createElement('h3');
  usernameElement.classList.add('username');
  usernameElement.textContent = await getCurrentUsername(); // Get the current username from the server
  
  // Set the username to the current username obtained from the server
  usernameElement.textContent = await getCurrentUsername();

  var commentTextElement = document.createElement('p');
  commentTextElement.classList.add('comment-text');
  commentTextElement.textContent = commentText;

  var replyButton = document.createElement('button');
  replyButton.classList.add('reply-button');
  replyButton.textContent = 'Reply';

  var replies = document.createElement('div');
  replies.classList.add('replies');

  commentHeader.appendChild(usernameElement);
  commentContent.appendChild(commentHeader);
  commentContent.appendChild(commentTextElement);
  commentContent.appendChild(replyButton);
  commentContent.appendChild(replies);

  comment.appendChild(profilePicture);
  comment.appendChild(commentContent);

  replyButton.addEventListener('click', function() {
    var replyInput = createReplyInput();
    commentContent.appendChild(replyInput);
  });

  commentSection.appendChild(comment);
}

// Initial comments
var commentSection = document.querySelector('.comment-section');

var comment1 = createComment('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum rhoncus, viverra orci et, tempor lorem.');
var comment2 = createComment('Donec venenatis nunc in ex viverra lacinia. Integer mollis ultrices augue, ac posuere enim hendrerit vel.');
var comment3 = createComment('Proin non justo vel dui volutpat venenatis. In scelerisque erat nec pharetra auctor.');

commentSection.appendChild(comment1);
commentSection.appendChild(comment2);
commentSection.appendChild(comment3);
