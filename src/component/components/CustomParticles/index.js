import Particles from "react-tsparticles";
function CustomParticles() {
  return (
    
      <Particles
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: { enable: true, mode: "repulse" },
    
            resize: true
          },
          
        },
        emitters: {
          position: {
            x: 50,
            y: -30
          },
          rate: {
            quantity: 2,
            delay: 0.25
          }
        },
        particles: {
          color: {
            value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"]
          },
          move: {
            decay: 0.05,
            direction: "bottom",
            enable: true,
            gravity: {
              enable: true,
              maxSpeed: 400
            },
            outModes: {
              top: "none",
              default: "destroy"
            },
          },
          number: {
            value: 0
          },
          opacity: {
            value: 1
          },
          rotate: {
            value: {
              min: 0,
              max: 360
            },
            direction: "random",
            animation: {
              enable: true,
              speed: 30
            }
          },
          tilt: {
            direction: "random",
            enable: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 30
            }
          },
          size: {
            value: 8
          },
          roll: {
            darken: {
              enable: true,
              value: 25
            },
            enable: true,
            speed: {
              min: 5,
              max: 15
            }
          },
          wobble: {
            distance: 30,
            enable: true,
            speed: {
              min: -7,
              max: 7
            }
          },
          shape: {
            type: [
              "image"
            ],
            options: {
              image: [
                {
                  src: "/assets/img/coin.png",
                  width: 15,
                  height: 15,
                  particles: {
                    size: {
                      value: 8
                    }
                  }
                },
              ]
            }
          }
        }
      }}></Particles>
  )
}

export default CustomParticles;
