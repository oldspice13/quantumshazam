class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;

  private constructor() {
    // Initialize sounds
    this.loadSound('immolation', '/sounds/immolation.mp3');
    this.loadSound('burning', '/sounds/burning.mp3');
    this.loadSound('complete', '/sounds/complete.mp3');
    this.loadSound('countdown', '/sounds/countdown.mp3');
    
    // Meditation sounds
    this.loadSound('meditation-start', '/sounds/meditation-start.mp3');
    this.loadSound('breath', '/sounds/breath.mp3');
    this.loadSound('acknowledge', '/sounds/acknowledge.mp3');
    this.loadSound('release', '/sounds/release.mp3');
    this.loadSound('prepare', '/sounds/prepare.mp3');
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private loadSound(name: string, path: string) {
    const audio = new Audio(path);
    audio.preload = 'auto';
    this.sounds.set(name, audio);
  }

  public play(name: string) {
    if (this.isMuted) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.error(`Error playing sound ${name}:`, error);
      });
    }
  }

  public stop(name: string) {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.sounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
      });
    }
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export const soundManager = SoundManager.getInstance(); 