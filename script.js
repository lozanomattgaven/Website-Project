document.addEventListener("click", function (event) 
{
  const messageButton = event.target.closest("[data-message]");
  if (messageButton) 
    {
      event.preventDefault();
      alert(messageButton.getAttribute("data-message"));
    }

  const pill = event.target.closest(".pill");
  if (pill) 
    {
      const group = pill.closest(".pill-row");
      if (group) 
      {
        group.querySelectorAll(".pill").forEach(function (item) 
        {
          item.classList.remove("selected");
        });
          pill.classList.add("selected");
      }

      const filterType = pill.getAttribute("data-discover-filter");
      if (filterType) 
      {
        const selectedGenre = document.querySelector('[data-filter-section="genre"] .pill.selected');
        const selectedMood = document.querySelector('[data-filter-section="mood"] .pill.selected');
        const genre = selectedGenre ? selectedGenre.getAttribute("data-filter") : "all";
        const mood = selectedMood ? selectedMood.getAttribute("data-filter") : "all";

        document.querySelectorAll("[data-discover-card]").forEach(function (card) 
        {
          const matchesGenre = genre === "all" || card.getAttribute("data-genre") === genre;
          const matchesMood = mood === "all" || card.getAttribute("data-mood") === mood;
          card.style.display = matchesGenre && matchesMood ? "" : "none";
        });
      }
    }

  const removeButton = event.target.closest(".delete-song");
  if (removeButton) 
  {
    removeButton.closest(".queue-row").remove();
    updateQueueCount();
  }

  const addButton = event.target.closest(".add-recommendation");
  if (addButton) 
  {
    const list = document.getElementById("queue-list");
    if (list) 
    {
      const card = addButton.closest(".recommendation");
      const artwork = card.querySelector("img").getAttribute("src");
      const row = document.createElement("div");
      row.className = "queue-row";
      row.innerHTML = '<span class="drag">⠿</span><span class="number"></span><img src="' + artwork + '" alt=""><div class="song-name"><strong>Playlist</strong><span>Artist</span></div><span class="duration">3:48</span><button class="delete-song" aria-label="Remove song">▣</button>';
      list.appendChild(row);
      updateQueueCount();
    }
  }
});

function updateQueueCount() 
{
  const list = document.getElementById("queue-list");
  const count = document.getElementById("queue-count");
  if (list && count) 
  {
    const rows = list.querySelectorAll(".queue-row").length;
    count.textContent = rows + (rows === 1 ? " song" : " songs");
    list.querySelectorAll(".queue-row .number").forEach(function (number, index) 
    {
      number.textContent = String(index + 1).padStart(2, "0");
    });
  }
}

const searchForm = document.getElementById("song-search");
if (searchForm) 
{
  searchForm.addEventListener("submit", function (event) 
  {
    event.preventDefault();
    const query = document.getElementById("song-query").value.trim();
    if (!query) 
    {
      alert("Enter a song or artist to search.");
      return;
    }
    alert('This is a mockup, so "' + query + '" is not searched in a real music catalog.');
  });
}

document.querySelectorAll(".mood-filters .pill").forEach(function (button) 
{
  button.addEventListener("click", function () 
  {
    const filter = button.getAttribute("data-filter");
    document.querySelectorAll(".filter-cards [data-mood]").forEach(function (card) 
    {
      card.style.display = filter === "all" || card.getAttribute("data-mood") === filter ? "" : "none";
    });
  });
});
