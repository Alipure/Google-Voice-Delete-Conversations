const delay = (ms) => new Promise(r => setTimeout(r, ms));

const cards = [...document.querySelectorAll("div.container.vnt[role='button']")];

const clickThreeDots = () => {
  // Use the exact path to the three dots button
  const dotsBtn = document.querySelector(
    "#gvPageRoot > div:nth-child(2) > gv-app > gv-side-panel > mat-sidenav-container > mat-sidenav-content > div > div.content-container > gv-threads-view > div > div.thread-detail-container.ng-star-inserted > gv-thread-details > mat-drawer-container > mat-drawer-content > div.header > gv-thread-details-header > div > div.action-buttons.ng-star-inserted > span > button"
  );
  
  if (dotsBtn) {
    dotsBtn.click();
    console.log("Three dots menu clicked");
    return true;
  }
  return false;
};

const clickDeleteOption = () => {
  // Find and click the Delete menu item by looking for it
  const menuItems = document.querySelectorAll('.mat-mdc-menu-item');
  for (const item of menuItems) {
    const icon = item.querySelector('mat-icon');
    if (icon && icon.textContent.trim().includes('delete')) {
      item.click();
      console.log("Delete option clicked");
      return true;
    }
  }
  return false;
};

const confirmDelete = () => {
  // Find the confirm button
  const buttons = document.querySelectorAll('gv-basic-dialog mat-dialog-actions button');
  for (const btn of buttons) {
    // The confirm button is usually the last one or has specific text
    if (btn.textContent.trim().toLowerCase().includes('delete') || 
        btn.textContent.trim().toLowerCase().includes('confirm')) {
      btn.click();
      console.log("Delete confirmed!");
      return true;
    }
  }
  
  // Fallback: click the last button in the dialog
  const lastBtn = document.querySelector('gv-basic-dialog mat-dialog-actions button:last-child');
  if (lastBtn) {
    lastBtn.click();
    console.log("Delete confirmed (fallback)!");
    return true;
  }
  
  return false;
};

(async () => {
  for (const card of cards) {
    console.log(`\n--- Processing conversation ${cards.indexOf(card) + 1}/${cards.length} ---`);
    
    card.scrollIntoView({ block: "center" });
    card.click();
    await delay(1000);
    
    // Click three dots
    if (!clickThreeDots()) {
      console.log("Could not click three dots, skipping...");
      await delay(2000);
      continue;
    }
    await delay(500);
    
    // Click Delete
    if (!clickDeleteOption()) {
      console.log("Could not click Delete option, skipping...");
      await delay(2000);
      continue;
    }
    await delay(500);
    
    // Confirm delete
    if (!confirmDelete()) {
      console.log("Could not confirm delete, skipping...");
      await delay(2000);
      continue;
    }
    
    console.log("✅ Conversation deleted!");
    await delay(1500);
  }
  
  console.log("\n✅ All conversations have been deleted!");
})();
