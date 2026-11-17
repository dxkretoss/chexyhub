import React, { useMemo } from 'react';
import * as THREE from 'three';
import { generateCheckPatternCanvas } from '../../utils/checkPatternGenerator';

export function ShirtGeometry({
  patternType = 'tartan',
  primaryColor = '#B74737',
  secondaryColor = '#1C2841',
  accentColor = '#EDE7DC',
  gridScale = 12,
  collarType = 'button-down',
  sleeveLength = 'long', // 'long' or 'short'
}) {
  // 1. Generate fabric texture using procedural canvas
  const texture = useMemo(() => {
    const canvas = generateCheckPatternCanvas({
      patternType,
      primaryColor,
      secondaryColor,
      accentColor,
      gridScale,
      size: 1024,
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.4, 2.4);
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, [patternType, primaryColor, secondaryColor, accentColor, gridScale]);

  // 2. Bias-cut pocket texture (rotated 45 degrees for luxury tailoring)
  const pocketTexture = useMemo(() => {
    const canvas = generateCheckPatternCanvas({
      patternType,
      primaryColor,
      secondaryColor,
      accentColor,
      gridScale,
      size: 512,
    });
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.0, 2.0);
    tex.rotation = Math.PI / 4;
    tex.center.set(0.5, 0.5);
    tex.needsUpdate = true;
    return tex;
  }, [patternType, primaryColor, secondaryColor, accentColor, gridScale]);

  // Main fabric material
  const fabricMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.05,
      bumpScale: 0.02,
      side: THREE.DoubleSide,
    });
  }, [texture]);

  // Bias-cut pocket material
  const pocketMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: pocketTexture,
      roughness: 0.8,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, [pocketTexture]);

  // Mother-of-pearl buttons
  const buttonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FBF8F2',
      roughness: 0.2,
      metalness: 0.3,
    });
  }, []);

  // Inner lining / collar stand interior
  const interiorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#282828',
      roughness: 0.9,
    });
  }, []);

  // Button vertical positions along front placket
  const buttonYs = [1.02, 0.72, 0.42, 0.12, -0.18, -0.48];

  return (
    <group position={[0, 0.1, 0]}>
      {/* ============================================================== */}
      {/* 1. TAILORED SHIRT BODY / CHEST & TORSO                         */}
      {/* ============================================================== */}
      
      {/* Upper Chest & Shoulders (Form-fitting athletic taper) */}
      <mesh material={fabricMaterial} position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.82, 0.92, 0.9, 36, 1, false]} />
      </mesh>

      {/* Mid Torso & Waist (Gently tailored curve) */}
      <mesh material={fabricMaterial} position={[0, -0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 0.88, 0.6, 36, 1, false]} />
      </mesh>

      {/* Lower Hem Section (Flaring out slightly with curved shirt tail) */}
      <mesh material={fabricMaterial} position={[0, -0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.88, 0.94, 0.45, 36, 1, false]} />
      </mesh>

      {/* Front Curved Shirt Tail (Split curved hem profile) */}
      <mesh material={fabricMaterial} position={[0, -0.78, 0.15]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.94, 0.92, 0.14, 32, 1, false, 0, Math.PI]} />
      </mesh>
      {/* Back Curved Shirt Tail */}
      <mesh material={fabricMaterial} position={[0, -0.80, -0.15]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.94, 0.92, 0.14, 32, 1, false, Math.PI, Math.PI]} />
      </mesh>

      {/* Shoulder Yoke Slopes (Left & Right) */}
      <mesh
        material={fabricMaterial}
        position={[-0.6, 1.12, 0]}
        rotation={[0, 0, 0.28]}
        castShadow
      >
        <cylinderGeometry args={[0.26, 0.38, 0.55, 24]} />
      </mesh>
      <mesh
        material={fabricMaterial}
        position={[0.6, 1.12, 0]}
        rotation={[0, 0, -0.28]}
        castShadow
      >
        <cylinderGeometry args={[0.26, 0.38, 0.55, 24]} />
      </mesh>

      {/* ============================================================== */}
      {/* 2. FRONT BUTTON PLACKET & MOTHER-OF-PEARL BUTTONS              */}
      {/* ============================================================== */}
      
      {/* Raised center vertical placket */}
      <mesh
        material={fabricMaterial}
        position={[0, 0.2, 0.91]}
        castShadow
      >
        <boxGeometry args={[0.12, 1.75, 0.035]} />
      </mesh>

      {/* Pearl Buttons along Placket */}
      {buttonYs.map((y, i) => (
        <group key={i} position={[0, y, 0.935]}>
          {/* Button Disc */}
          <mesh material={buttonMaterial} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.024, 0.024, 0.012, 20]} />
          </mesh>
          {/* Inner Thread Hole Detail */}
          <mesh position={[0, 0, 0.007]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.003, 12]} />
            <meshBasicMaterial color="#555555" />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 3. LUXURY CHEST POCKET (BIAS-CUT 45° WEAVE)                    */}
      {/* ============================================================== */}
      <mesh
        material={pocketMaterial}
        position={[-0.42, 0.52, 0.88]}
        rotation={[0, -0.32, 0]}
        castShadow
      >
        <boxGeometry args={[0.3, 0.34, 0.02]} />
      </mesh>
      {/* Pocket Top Hem Fold */}
      <mesh
        material={fabricMaterial}
        position={[-0.42, 0.69, 0.89]}
        rotation={[0, -0.32, 0]}
      >
        <boxGeometry args={[0.3, 0.045, 0.025]} />
      </mesh>

      {/* ============================================================== */}
      {/* 4. COLLAR ARCHITECTURE (BAND STAND & TURNED-DOWN WINGS)        */}
      {/* ============================================================== */}
      
      {/* Inner Neck Opening / Dark Interior */}
      <mesh material={interiorMaterial} position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.34, 0.36, 0.25, 32, 1, true]} />
      </mesh>

      {/* Collar Neckband Stand */}
      <mesh material={fabricMaterial} position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.22, 32, 1, false]} />
      </mesh>

      {/* Top Collar Button */}
      <mesh position={[0, 1.25, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.01, 16]} />
        <meshStandardMaterial color="#FBF8F2" roughness={0.3} />
      </mesh>

      {/* Left Collar Wing (Turned-down pointed dress lapel) */}
      <mesh
        material={fabricMaterial}
        position={[-0.24, 1.14, 0.38]}
        rotation={[0.42, 0.24, -0.45]}
        castShadow
      >
        <boxGeometry args={[0.46, 0.24, 0.04]} />
      </mesh>

      {/* Right Collar Wing (Turned-down pointed dress lapel) */}
      <mesh
        material={fabricMaterial}
        position={[0.24, 1.14, 0.38]}
        rotation={[0.42, -0.24, 0.45]}
        castShadow
      >
        <boxGeometry args={[0.46, 0.24, 0.04]} />
      </mesh>

      {/* Back of Collar Fold (Wraps naturally around nape of neck) */}
      <mesh
        material={fabricMaterial}
        position={[0, 1.24, -0.36]}
        rotation={[-0.25, 0, 0]}
      >
        <boxGeometry args={[0.72, 0.22, 0.045]} />
      </mesh>

      {/* Button-down collar corner tips buttons (if button-down type) */}
      {collarType === 'button-down' && (
        <>
          <mesh position={[-0.34, 0.98, 0.48]} rotation={[0.4, 0.2, 0]}>
            <sphereGeometry args={[0.014, 12, 12]} />
            <meshStandardMaterial color="#FBF8F2" />
          </mesh>
          <mesh position={[0.34, 0.98, 0.48]} rotation={[0.4, -0.2, 0]}>
            <sphereGeometry args={[0.014, 12, 12]} />
            <meshStandardMaterial color="#FBF8F2" />
          </mesh>
        </>
      )}

      {/* ============================================================== */}
      {/* 5. NATURAL DRAPED SLEEVES WITH WRIST CUFFS                     */}
      {/* ============================================================== */}
      
      {/* LEFT ARM */}
      <group position={[-0.82, 0.95, 0]}>
        {/* Upper Arm: Draping naturally downward at 35 degrees */}
        <mesh
          material={fabricMaterial}
          position={[-0.32, -0.38, 0.04]}
          rotation={[0.1, 0, 0.58]}
          castShadow
        >
          <cylinderGeometry args={[0.26, 0.23, 0.85, 24]} />
        </mesh>

        {sleeveLength === 'long' ? (
          <>
            {/* Forearm: Continuing downward to wrist */}
            <mesh
              material={fabricMaterial}
              position={[-0.72, -0.98, 0.08]}
              rotation={[0.15, 0, 0.52]}
              castShadow
            >
              <cylinderGeometry args={[0.22, 0.18, 0.8, 24]} />
            </mesh>

            {/* Left Wrist Cuff */}
            <mesh
              material={fabricMaterial}
              position={[-0.98, -1.38, 0.1]}
              rotation={[0.15, 0, 0.52]}
              castShadow
            >
              <cylinderGeometry args={[0.2, 0.19, 0.18, 24]} />
            </mesh>
            {/* Left Cuff Button */}
            <mesh
              position={[-0.96, -1.38, 0.28]}
              rotation={[0, 0, 0]}
            >
              <sphereGeometry args={[0.016, 12, 12]} />
              <meshStandardMaterial color="#FBF8F2" />
            </mesh>
          </>
        ) : (
          /* Short Sleeve Hem Band */
          <mesh
            material={fabricMaterial}
            position={[-0.52, -0.68, 0.06]}
            rotation={[0.1, 0, 0.58]}
          >
            <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
          </mesh>
        )}
      </group>

      {/* RIGHT ARM */}
      <group position={[0.82, 0.95, 0]}>
        {/* Upper Arm: Draping naturally downward at 35 degrees */}
        <mesh
          material={fabricMaterial}
          position={[0.32, -0.38, 0.04]}
          rotation={[0.1, 0, -0.58]}
          castShadow
        >
          <cylinderGeometry args={[0.26, 0.23, 0.85, 24]} />
        </mesh>

        {sleeveLength === 'long' ? (
          <>
            {/* Forearm: Continuing downward to wrist */}
            <mesh
              material={fabricMaterial}
              position={[0.72, -0.98, 0.08]}
              rotation={[0.15, 0, -0.52]}
              castShadow
            >
              <cylinderGeometry args={[0.22, 0.18, 0.8, 24]} />
            </mesh>

            {/* Right Wrist Cuff */}
            <mesh
              material={fabricMaterial}
              position={[0.98, -1.38, 0.1]}
              rotation={[0.15, 0, -0.52]}
              castShadow
            >
              <cylinderGeometry args={[0.2, 0.19, 0.18, 24]} />
            </mesh>
            {/* Right Cuff Button */}
            <mesh
              position={[0.96, -1.38, 0.28]}
              rotation={[0, 0, 0]}
            >
              <sphereGeometry args={[0.016, 12, 12]} />
              <meshStandardMaterial color="#FBF8F2" />
            </mesh>
          </>
        ) : (
          /* Short Sleeve Hem Band */
          <mesh
            material={fabricMaterial}
            position={[0.52, -0.68, 0.06]}
            rotation={[0.1, 0, -0.58]}
          >
            <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
          </mesh>
        )}
      </group>
    </group>
  );
}
