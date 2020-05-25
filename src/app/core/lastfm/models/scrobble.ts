interface TrackScrobble {
  album: string;
  artist: string;
  song: string;
}

interface CorrectedObject {
  corrected: '0' | '1';
  '#text': string;
}

interface ScrobbleResponse {
  scrobbles: {
    '@attr': {
      accepted: number;
      ignored: number;
    };
    scrobble: {
      album: CorrectedObject;
      albumArtist: CorrectedObject;
      artist: CorrectedObject;
      ignoredMessage: {
        code: string;
        '#text': string;
      };
      timestamp: string;
      track: CorrectedObject;
    };
  };
}
