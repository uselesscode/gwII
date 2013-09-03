function render (obj, config) {
  if (obj) {
    var id = obj.icon_file_id || obj.file_id,
      signature = obj.icon_file_signature || obj.signature,
      format = config && config.format ? config.format : 'jpg';

    format = format.replace(/^\./, '');

    if (id && signature) {
      return 'https://render.guildwars2.com/file/' + signature + '/' + id + '.' + format;
    }
  }
  return null;
}
