export const formatString = (str: string, html: any) => {
  let strLimited = "";

  // CHECK IF THE DATA IS STR OR HTML
  if (str != "") {
    // RETURN STRING
    if (str.length > 16) {
      strLimited = str.substring(0, 16);
      strLimited += "...";
      return strLimited;
    } else {
      return str;
    }
  } else {
    // RETURN STRIN WITH ELEMENT SPAN
    strLimited += html.props.children[0];
    strLimited += html.props.children[1];
    html.props.children[2].map((item: any) => {
      item.props.children.map((item2: any) => {
        strLimited += item2;
      });
    });
    if (strLimited.length > 38) {
      strLimited = strLimited.substring(0, 38);
      strLimited += "...";
      return <span>{strLimited}</span>;
    } else {
      return <span>{strLimited}</span>;
    }
  }
};
