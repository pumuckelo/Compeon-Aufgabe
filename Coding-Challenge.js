/* SMS can only be a maximum of 160 characters.
   If the user wants to send a message bigger than that, we need to break it up.
   We want a multi-part message to have this suffix added to each message:
   " - Part X of Y"
   14
*/

// You need to fix this function, currently it will crash with > 160 char messages.
function sendSmsMessage(text, to, from) {
  if (text.length) deliverMessageViaCarrier(text, to, from);
}

// This function actually sends the message via an already existing SMS carrier
// This function works, you don't change it.
function deliverMessageViaCarrier(text, to, from) {
  SmsCarrier.deliverMessage(text, to, from);
}
