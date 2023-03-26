function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var len = bytes.length;
  var value = ( bytes[0]<<8 | bytes[1]) & 0x3FFF;
  var batV = value / 1000;    //Battery,units:V

  var distance = 0;
  if (len==8)
  {
   value = bytes[2]<<8 | bytes[3];
   distance = (value);//distance,units:mm
   if (value<20)
    distance = "Invalid Reading";

   interrupt = bytes[4];
   value = bytes[5]<<8 | bytes[6];
   temperature = (value);
  }
  else
   distance = "No Sensor";

  var sensor = bytes[len-1];
  return {
       battery:batV ,
       distance:distance,
       temperature:temperature,
       interrupt_status:interrupt,
       sensor:sensor
  };
}
