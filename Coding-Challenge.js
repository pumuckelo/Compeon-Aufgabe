/* SMS can only be a maximum of 160 characters.
   If the user wants to send a message bigger than that, we need to break it up.
   We want a multi-part message to have this suffix added to each message:
   " - Part X of Y"
   14
*/

// You need to fix this function, currently it will crash with > 160 char messages.
function sendSmsMessage(text, to, from) {
  // If the message has less or equals 160 characters, simply send the message with the deliverMessageViaCarrier function
  if (text <= 160) {
    deliverMessageViaCarrier(text, to, from);
    return;
  }

  //If the message is bigger than 160 characters, we want to split the message and add a suffix to each message,
  //so that every message is max. 160 characters(including the suffix)
  //Then we send the messages with the "deliverMessageViaCarrier" function
  else {
    const textArray = text.split("");
    const splittedText = [];
    let messages = [];
    //split the message into multiple messages
    while (textArray.length > 0) {
      let message = textArray.slice(0, 146).join("");
      console.log(`Länge Nachricht: ${message.length}`);
      textArray.splice(0, 146);
      console.log(textArray.length);
      splittedText.push(message);
    }

    //Add suffix to messages
    messages = splittedText.map((message, i) => {
      message = message + ` - Part ${i + 1} of ${splittedText.length}`;
      console.log(`Länge Nachricht inkl. Suffix: ${message.length}`);
      return message;
      // return message + ` - Part ${i + 1} of ${splittedText.length}`
    });
    //Ohne den oberen Kommentar "Länge Nachricht.." hinzuzufügen würde ich folgenden Code verwenden
    // messages = splittedText.map((message, i) => message + ` - Part ${i + 1} of ${splittedText.length}`

    //Send the messages
    messages.forEach(message => {
      console.log(message);
      //   deliverMessageViaCarrier(message, to, from);
    });
    // console.log(messages);
    // console.log(textArray);
  }
}

// This function actually sends the message via an already existing SMS carrier
// This function works, you don't change it.
function deliverMessageViaCarrier(text, to, from) {
  SmsCarrier.deliverMessage(text, to, from);
}

const message = `I'm baby neutra palo santo sustainable pork belly street art farm-to-table VHS keffiyeh disrupt pabst whatever cray flexitarian vice. Normcore biodiesel meggings shoreditch franzen trust fund, drinking vinegar pok pok poke shaman pour-over. Semiotics butcher offal chartreuse pinterest tote bag migas chambray synth craft beer jianbing sustainable glossier. Meditation pitchfork pickled retro banh mi XOXO iPhone, meh hella hot chicken ethical helvetica street art. Enamel pin meditation locavore gastropub, polaroid messenger bag photo booth.
Shoreditch tumblr hoodie retro, man bun portland wayfarers slow-carb chambray wolf PBR&B twee narwhal. Plaid ugh freegan gastropub gluten-free shabby chic. Artisan scenester kale chips mixtape, raw denim adaptogen everyday carry dreamcatcher lumbersexual microdosing tousled vaporware la croix farm-to-table brooklyn. 3 wolf moon art party squid, mixtape chambray fashion axe irony scenester. Paleo letterpress retro put a bird on it, everyday carry intelligentsia prism gochujang brunch glossier taxidermy keytar schlitz. Chartreuse austin XOXO kogi. Chicharrones affogato ugh kombucha ethical, adaptogen snackwave godard food truck neutra.`;

sendSmsMessage(message, "hans", "tom");
