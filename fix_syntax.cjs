const fs = require('fs');
const file = 'e:\\PEGASUS\\pps-raharjo\\src\\components\\PublicPages.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `                  {unit.label}
                </button>
              );
          </div>
        </div>`;

const replacement = `                  {unit.label}
                </button>
              );
            })}
          </div>
        </div>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content);
    console.log('Fixed syntax error!');
} else {
    console.log('Target not found.');
}
