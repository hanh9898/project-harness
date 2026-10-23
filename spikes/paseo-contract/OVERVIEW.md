Harness contract experiment for one local Paseo 0.11.1 daemon. Reads native profiles and a local experiment journal. It exposes a status screen in Command Center and records each plugin startup, reconciling an existing test worker if present.

Native profiles must be created in Paseo first. This plugin does not create profiles or launch agents at startup. The separate experiment CLI can launch a bounded worker explicitly. State stays in this experiment's .spike directory.

This is a local development experiment, not the harness product. It is bound to the local daemon endpoint and the source checkout's absolute path. Skill evidence validation proves a quotation matches the source, not that the provider isolated skill discovery or that the assessment is correct.
