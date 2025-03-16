import React from 'react';

const Step: React.FC<{
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}> = ({ number, title, description, isLast = false }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(280,100%,70%)] text-white font-bold">
          {number}
        </div>
        {!isLast && <div className="h-full w-0.5 bg-[hsl(280,100%,70%)]"></div>}
      </div>
      <div className="ml-4 pb-8">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <div id="how-it-works" className="w-full py-12">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="max-w-3xl mx-auto">
        <Step
          number={1}
          title="Create an Account"
          description="Sign up as a landlord or tenant. Connect your wallet to enable blockchain transactions."
        />
        <Step
          number={2}
          title="Upload Documents"
          description="Upload your ID and necessary documents. Our AI will analyze and verify them automatically."
        />
        <Step
          number={3}
          title="Create or Join Agreement"
          description="Landlords can create new agreements. Tenants can join existing ones using QR codes."
        />
        <Step
          number={4}
          title="Sign and Verify"
          description="Both parties sign the agreement digitally. The contract is deployed to the blockchain."
        />
        <Step
          number={5}
          title="Manage Your Agreement"
          description="Access your agreement anytime. Use QR codes for quick verification and updates."
          isLast
        />
      </div>
    </div>
  );
}; 